import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getUser } from "../services/userService"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "@/shared/GlobalStateProvider"
import { toast } from "sonner"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  emailAsPass: z.string().min(1, {
    message: "Email is required.",
  }),
})

export function useUserForms() {
  const { setUser } = useGlobalState();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Bret",
      emailAsPass: "Sincere@april.biz",
    },
  });

  function onSubmit(formValue: z.infer<typeof formSchema>) {
    getUser(formValue)
      .then(user => {
        if (user && user.length) {
          setUser(user[0]);
          navigate("/family");
        } else {
          toast.error("Invalid credentials");
        }
      })
      .catch(err => {
        toast.error("Error fetching user");
        console.error("Error fetching user:", err);
      });
  }

  return { form, onSubmit };
}