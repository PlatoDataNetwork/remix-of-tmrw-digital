import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, email, phone, country_code } = await req.json();

    if (!full_name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Full name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if email already has an active key
    const { data: existing } = await supabase
      .from("api_keys")
      .select("api_key")
      .eq("email", email)
      .eq("is_active", true)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "An API key has already been issued to this email. Please check your inbox.",
          api_key: existing.api_key,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create new API key
    const { data, error } = await supabase
      .from("api_keys")
      .insert({
        full_name: full_name.trim().substring(0, 200),
        email: email.trim().toLowerCase().substring(0, 255),
        phone: phone?.trim().substring(0, 30) || null,
        country_code: country_code?.trim().substring(0, 10) || null,
      })
      .select("api_key")
      .single();

    if (error) {
      console.error("Error creating API key:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to create API key" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your API key has been generated successfully.",
        api_key: data.api_key,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
