
"use client";

import { useEffect, useState } from "react";
import {
  Bug,
  Lightbulb,
  Loader2,
  MessageSquareText,
  ShieldAlert,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Feedback = {
  id: number | string;
  user_id: string;
  type: string;
  message: string;
  page_url: string | null;
  created_at: string;
};

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    void loadFeedback();
  }, []);

  async function loadFeedback() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAuthorized(false);
        return;
      }

      const { data: adminData, error: adminError } =
        await supabase
          .from("super_admins")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle();

      if (adminError || !adminData) {
        setAuthorized(false);
        return;
      }

      setAuthorized(true);

      const { data, error } = await supabase
        .from("feedback")
        .select("id,user_id,type,message,page_url,created_at")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setFeedback((data ?? []) as Feedback[]);
    } catch (error) {
      console.error("Unable to load feedback:", error);
    } finally {
      setLoading(false);
    }
  }

  function getIcon(type: string) {
    if (type === "Bug") {
      return Bug;
    }

    if (type === "Suggestion") {
      return Lightbulb;
    }

    return MessageSquareText;
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center sm:p-8">
        <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-red-400" />

        <h1 className="text-2xl font-black">
          Access Denied
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          This page is available only to AllSports League administrators.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
          <MessageSquareText className="h-6 w-6 text-cyan-400" />
        </div>

        <h1 className="text-3xl font-black sm:text-4xl">
          Beta Feedback
        </h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Review feedback submitted by beta testers.
        </p>
      </div>

      {feedback.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
          <p className="text-muted-foreground">
            No feedback received yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {feedback.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-bold">
                        {item.type}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-300">
                      {item.message}
                    </p>

                    {item.page_url && (
                      <p className="mt-3 truncate text-xs text-muted-foreground">
                        Page: {item.page_url}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}