"use client";

import { FormEvent, useState } from "react";
import { MessageSquareText } from "lucide-react";

import { supabase } from "@/lib/supabase";

type FeedbackType =
  | "Bug"
  | "Suggestion"
  | "Other";

export default function FeedbackPage() {
  const [type, setType] =
    useState<FeedbackType>("Bug");

  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!message.trim()) {
      setError("Please enter your feedback.");
      return;
    }

    try {
      setSending(true);
      setError("");
      setSuccess(false);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be signed in to send feedback.");
        return;
      }

      const { error: insertError } =
        await supabase
          .from("feedback")
          .insert({
            user_id: user.id,
            type,
            message: message.trim(),
            page_url: window.location.href,
          });

      if (insertError) {
        throw insertError;
      }

      setMessage("");
      setType("Bug");
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send feedback."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
          <MessageSquareText className="h-6 w-6 text-cyan-400" />
        </div>

        <h1 className="text-3xl font-black tracking-tight">
          Send Feedback
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Help us improve AllSports League.
          Report bugs or share your ideas.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
      >
        <div>
          <label
            htmlFor="feedback-type"
            className="mb-2 block text-sm font-semibold"
          >
            Feedback Type
          </label>

          <select
            id="feedback-type"
            value={type}
            onChange={(event) =>
              setType(
                event.target.value as FeedbackType
              )
            }
            className="min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm outline-none transition focus:border-cyan-500/50"
          >
            <option value="Bug">
              Bug
            </option>

            <option value="Suggestion">
              Suggestion
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="feedback-message"
            className="mb-2 block text-sm font-semibold"
          >
            Message
          </label>

          <textarea
            id="feedback-message"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Tell us what happened or what you would like to see..."
            rows={6}
            maxLength={2000}
            className="w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-base outline-none transition placeholder:text-muted-foreground focus:border-cyan-500/50"
          />

          <p className="mt-2 text-right text-xs text-muted-foreground">
            {message.length}/2000
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
            Thank you! Your feedback was sent successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending
            ? "Sending..."
            : "Send Feedback"}
        </button>
      </form>
    </div>
  );
}
