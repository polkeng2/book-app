"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useApi from "../hooks/useApi";
import { Book } from "../library/tableComponents/columns";
import { useBookData } from "../hooks/useBookData";
import { ArrowLeft } from "lucide-react";

const bookSchema = z.object({
  id: z.number(),
  titol: z
    .string({
      required_error: "El camp és obligatori",
      invalid_type_error: "El camp ha de ser un text.",
    })
    .max(500, { message: "El camp no pot excedit els 500 caràcters." })
    .min(1, { message: "El camp no pot estar buit." }),
  autor: z
    .string({
      required_error: "El camp és obligatori",
      invalid_type_error: "El camp ha de ser un text.",
    })
    .max(50, { message: "El camp no pot excedit els 50 caràcters." })
    .min(1, { message: "El camp no pot estar buit." }),
  prestatge: z
    .string({
      required_error: "El camp és obligatori",
    })
    .regex(new RegExp("^[0-9]*$"), {
      message: "El camp només pot contenir números",
    })
    .max(2, { message: "El número es massa llarg." })
    .min(1, { message: "El camp no pot estar buit." }),
  posicio: z
    .string({
      required_error: "El camp és obligatori",
    })
    .regex(new RegExp("^[0-9]*$"), {
      message: "El camp només pot contenir números",
    })
    .max(2, { message: "El número es massa llarg." })
    .min(1, { message: "El camp no pot estar buit." }),
  habitacio: z
    .string({
      required_error: "El camp és obligatori",
      invalid_type_error: "El camp ha de ser un text.",
    })
    .max(50, { message: "El camp no pot excedit els 50 caràcters." })
    .min(1, { message: "El camp no pot estar buit." }),
  tipus: z
    .string({
      required_error: "El camp és obligatori",
      invalid_type_error: "El camp ha de ser un text.",
    })
    .max(50, { message: "El camp no pot excedit els 50 caràcters." })
    .min(1, { message: "El camp no pot estar buit." }),
  editorial: z
    .string({
      required_error: "El camp és obligatori",
      invalid_type_error: "El camp ha de ser un text.",
    })
    .max(50, { message: "El camp no pot excedit els 50 caràcters." })
    .min(1, { message: "El camp no pot estar buit." }),
  idioma: z
    .string({
      required_error: "El camp és obligatori",
      invalid_type_error: "El camp ha de ser un text.",
    })
    .max(50, { message: "El camp no pot excedit els 50 caràcters." })
    .min(1, { message: "El camp no pot estar buit." }),
  notes: z
    .string()
    .max(1000, { message: "El camp no pot excedir els 1000 caràcters." }),
});

type BookFormValues = z.infer<typeof bookSchema>;

export const BookForm = ({
  getToken,
}: {
  getToken: () => Promise<string | undefined>;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { createBook, editBook, deleteBook } = useApi();
  const { data: llibres } = useBookData();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    //TODO: Ficar al id el valor del param
    defaultValues: {
      id: 0,
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

  const id = useSearchParams().get("id");
  const { mutate, isPending } = useMutation({
    mutationFn: async (newBook: Book) => {
      const token = await getToken();
      if (id) return await editBook(id, newBook, token);
      return await createBook(newBook, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBooks"] });
      toast({
        title: "Els canvis s'han guardat correctament.",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Els canvis no s'han pogut desar",
        description: "Hi ha hagut un error inesperat.",
      });
    },
  });

  //delete mutation
  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      if (!id) return;
      const token = await getToken();
      const bookId = parseInt(id);
      const response = await deleteBook(bookId, token);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBooks"] });
      toast({
        title: "El llibre s'ha eliminat correctament.",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "El llibre no s'ha pogut eliminar correctament.",
        description: "Hi ha hagut un error inesperat.",
      });
    },
  });

  function onSubmit(values: BookFormValues) {
    mutate(values);
  }

  useEffect(() => {
    if (id) {
      const book = llibres?.find((book: Book) => book.id === parseInt(id));
      if (!book) return;
      form.setValue("titol", book.titol);
      form.setValue("autor", book.autor);
      form.setValue("prestatge", book.prestatge);
      form.setValue("posicio", book.posicio);
      form.setValue("habitacio", book.habitacio);
      form.setValue("tipus", book.tipus);
      form.setValue("editorial", book.editorial);
      form.setValue("idioma", book.idioma);
      form.setValue("notes", book.notes);
    }
  }, [id, llibres, form]);

  const labels: (keyof BookFormValues)[] = [
    "titol",
    "autor",
    "prestatge",
    "posicio",
    "habitacio",
    "tipus",
    "editorial",
    "idioma",
    "notes",
  ];

  const names = [
    "Títol",
    "Autor",
    "Prestatge",
    "Posició",
    "Habitació",
    "Tipus",
    "Editorial",
    "Idioma",
    "Notes",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 w-full">
      <Link
        className="mr-auto pl-16 pb-1 text-slate-300 hover:text-slate-50 flex items-center"
        href="/"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Torna a la biblioteca
      </Link>
      <div className="px-4 py-6 w-[40%] flex flex-col justify-center items-center bg-slate-800 border-0 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-slate-300 mb-5">
          {id ? "Edita el llibre" : "Crea un nou llibre"}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-[80%]"
            //TODO: Change width
          >
            {labels.map((label, index) => (
              <FormField
                key={label}
                name={label}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      {names[index]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400 placeholder"
                        placeholder={names[index]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex flex-row justify-between items-center">
              {id && (
                <Button
                  type="button"
                  variant={"outline"}
                  className="bg-red-700 hover:bg-red-800"
                  disabled={isDeleting}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Estàs segur que vols eliminar aquest llibre?",
                      )
                    ) {
                      deleteMutation();
                    }
                  }}
                >
                  {isDeleting ? "Eliminant..." : "Elimina"}
                </Button>
              )}
              <Button
                type="submit"
                variant={"outline"}
                className={`bg-slate-900 text-slate-300 ${
                  !id && "rounded-lg w-full"
                }`}
                disabled={isPending}
              >
                {isPending ? "Guardant..." : "Guarda"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
