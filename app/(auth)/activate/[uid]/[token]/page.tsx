"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Dispatch, State } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { activateAccount } from "@/slices/authSlice";

export default function ActivatePage() {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { uid, token } = useParams();
  const [activated, setActivated] = useState(false);

  const { loading, error } = useSelector((state: State) => state.auth);

  // From query param
  const queryParams = new URLSearchParams(searchParams);
  const activationCode = queryParams.get("code");

  useEffect(() => {
    const activate = async () => {
      if (activationCode && !activated) {
        try {
          await dispatch(
            activateAccount({ uid: "placeholder", token: activationCode })
          ).unwrap();

          setActivated(true); // mark as activated
          toast.success("Account activated successfully!");
          // Redirect to login after successful activation
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } catch (error) {
          console.error(error || "Activation failed");
          toast.error(typeof error === "string" ? error : "Activation failed");
        }
      }
    };

    activate();
  }, [activationCode, activated, dispatch, router]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading || activated) return;

    try {
      await dispatch(
        activateAccount({ uid: uid as string, token: token as string })
      ).unwrap();
      setActivated(true);
      toast.success("Account activated successfully!");
      // Redirect to login after successful activation
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Activate Failed", error);
      toast.error(typeof error === "string" ? error : "Activation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Activate Account</h1>
          <p className="text-muted-foreground">
            {activated
              ? "Your account has been activated successfully!"
              : "Click the button below to activate your account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading || activated}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : activated ? (
              "Activated!"
            ) : (
              "Activate Account"
            )}
          </Button>
        </div>

        {activated && (
          <p className="text-center text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
}
