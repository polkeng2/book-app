"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useApi from "../hooks/useApi";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export default function LoginForm({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { getAuth } = useApi();

  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return getAuth(values.email, values.password);
    },
    onSuccess: (value: string) => {
      //const cookieStore = cookies();
      //cookieStore.set("auth", value);
      setToken(value);
      toast({
        title: "Has iniciat sessió correctament.",
      });
      router.push("/", undefined);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error en el inici de sessió",
        description: "Usuari o contrassenya equivocada.",
      });
      console.log(error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="grid place-content-center w-full h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <Card className="w-96 bg-slate-800 rounded-lg shadow-lg text-slate-300">
            <CardHeader>
              <CardTitle className="text-2xl">Inici de sessió</CardTitle>
              <CardDescription>
                Inicia la sessió per poder accedir als teus llibres
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correu electrònic</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contrassenya</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
