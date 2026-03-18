import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, MailOpen, Bookmark, BookmarkCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  is_read: boolean;
  is_marked: boolean;
  created_at: string;
}

const AdminContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("contact_submissions")
        .select("*")
        .eq("id", id!)
        .single();
      if (data) {
        setContact(data as ContactSubmission);
        // Mark as read
        if (!data.is_read) {
          await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id!);
        }
      }
      setLoading(false);
    }
    if (id) fetch();
  }, [id]);

  const toggleMarked = async () => {
    if (!contact) return;
    const newVal = !contact.is_marked;
    await supabase.from("contact_submissions").update({ is_marked: newVal }).eq("id", contact.id);
    setContact({ ...contact, is_marked: newVal });
  };

  const toggleRead = async () => {
    if (!contact) return;
    const newVal = !contact.is_read;
    await supabase.from("contact_submissions").update({ is_read: newVal }).eq("id", contact.id);
    setContact({ ...contact, is_read: newVal });
  };

  if (loading) {
    return <div className="text-white/30 py-12 text-center">Loading...</div>;
  }

  if (!contact) {
    return <div className="text-white/30 py-12 text-center">Submission not found</div>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        to="/tmrw-admin/contacts"
        className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to submissions
      </Link>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">{contact.name}</h1>
            <p className="text-sm text-white/50 mt-1">{contact.email}</p>
            {contact.company && (
              <p className="text-sm text-white/40 mt-0.5">{contact.company}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRead}
              className="text-white/50 hover:text-white hover:bg-white/10"
            >
              {contact.is_read ? (
                <><MailOpen className="h-4 w-4 mr-1" /> Read</>
              ) : (
                <><Mail className="h-4 w-4 mr-1" /> Unread</>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMarked}
              className="text-white/50 hover:text-white hover:bg-white/10"
            >
              {contact.is_marked ? (
                <><BookmarkCheck className="h-4 w-4 mr-1 text-yellow-400" /> Marked</>
              ) : (
                <><Bookmark className="h-4 w-4 mr-1" /> Mark</>
              )}
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-white/40 mb-2">
            Received: {new Date(contact.created_at).toLocaleString()}
          </p>
          <p className="text-white/80 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminContactDetail;
