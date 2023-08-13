"use client";

import React from "react";
import { Book } from "../library/tableComponents/columns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";
import Link from "next/link";

const CreateBookForm = () => {
  const { toast } = useToast();
  const bookSchema = z.object({
    titol: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." }),
    autor: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." }),
    prestatge: z
      .string({
        required_error: "El camp és obligatori",
      })
      .regex(new RegExp("^[0-9]*$"), {
        message: "El camp només pot contenir números",
      })
      .max(2, { message: "El número es massa llarg." }),
    posicio: z
      .string({
        required_error: "El camp és obligatori",
      })
      .regex(new RegExp("^[0-9]*$"), {
        message: "El camp només pot contenir números",
      })
      .max(2, { message: "El número es massa llarg." }),
    habitacio: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(20, { message: "El camp no pot excedit els 20 caràcters." }),
    tipus: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." }),
    editorial: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." }),
    idioma: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." }),
    notes: z
      .string()
      .max(100, { message: "El camp no pot excedir els 100 caràcters." }),
  });
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      titol: "",
      autor: "",
      prestatge: "",
      posicio: "",
      habitacio: "",
      tipus: "",
      editorial: "",
      idioma: "",
      notes: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof bookSchema>) => {
      await axios.post("/api/books", values);
    },
    onSuccess: () => {
      toast({
        title: "El llibre s'ha creat correctament.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "El llibre no s'ha pogut crear correctament.",
        description: "Hi ha hagut un error inesperat.",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    mutate(values);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-300">
        <BarLoader color="#f9fcff" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-r from-blue-500 to-blue-300">
      {/* Put a button above everything else to go back to previous screen */}

      <Link className="mr-auto pl-16 pb-10" href="/library">
        <Button variant={"link"}>{"<- Torna a la biblioteca"}</Button>
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-5">
        Afegeix un nou llibre
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/3"
        >
          {/* Existing FormField */}
          <FormField
            control={form.control}
            name="titol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Títol</FormLabel>
                <FormControl>
                  <Input placeholder="Títol del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Autor */}
          <FormField
            control={form.control}
            name="autor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor</FormLabel>
                <FormControl>
                  <Input placeholder="Autor del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Prestatge */}
          <FormField
            control={form.control}
            name="prestatge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prestatge</FormLabel>
                <FormControl>
                  <Input placeholder="Prestatge del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Posició */}
          <FormField
            control={form.control}
            name="posicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posició</FormLabel>
                <FormControl>
                  <Input placeholder="Posició del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Habitació */}
          <FormField
            control={form.control}
            name="habitacio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habitació</FormLabel>
                <FormControl>
                  <Input placeholder="Habitació del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Tipus */}
          <FormField
            control={form.control}
            name="tipus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipus</FormLabel>
                <FormControl>
                  <Input placeholder="Tipus del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Editorial */}
          <FormField
            control={form.control}
            name="editorial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Editorial</FormLabel>
                <FormControl>
                  <Input placeholder="Editorial del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Idioma */}
          <FormField
            control={form.control}
            name="idioma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idioma</FormLabel>
                <FormControl>
                  <Input placeholder="Idioma del llibre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New FormField - Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none bg-white"
                    placeholder="Notes del llibre"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-sm text-gray-900">
                  Aquest camp no es obligatori.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" variant={"submit"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBookForm;
