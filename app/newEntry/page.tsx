"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import * as z from "zod";
import useApi from "../hooks/useApi";
import { Book } from "../library/tableComponents/columns";

const CreateBookForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const bookSchema = z.object({
    id: z.number(),
    titol: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(100, { message: "El camp no pot excedit els 50 caràcters." })
      .nonempty({ message: "El camp no pot estar buit." }),
    autor: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." })
      .nonempty({ message: "El camp no pot estar buit." }),
    prestatge: z
      .string({
        required_error: "El camp és obligatori",
      })
      .regex(new RegExp("^[0-9]*$"), {
        message: "El camp només pot contenir números",
      })
      .max(2, { message: "El número es massa llarg." })
      .nonempty({ message: "El camp no pot estar buit." }),
    posicio: z
      .string({
        required_error: "El camp és obligatori",
      })
      .regex(new RegExp("^[0-9]*$"), {
        message: "El camp només pot contenir números",
      })
      .max(2, { message: "El número es massa llarg." })
      .nonempty({ message: "El camp no pot estar buit." }),
    habitacio: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 20 caràcters." })
      .nonempty({ message: "El camp no pot estar buit." }),
    tipus: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." })
      .nonempty({ message: "El camp no pot estar buit." }),
    editorial: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." })
      .nonempty({ message: "El camp no pot estar buit." }),
    idioma: z
      .string({
        required_error: "El camp és obligatori",
        invalid_type_error: "El camp ha de ser un text.",
      })
      .max(50, { message: "El camp no pot excedit els 50 caràcters." })
      .nonempty({ message: "El camp no pot estar buit." }),
    notes: z
      .string()
      .max(100, { message: "El camp no pot excedir els 100 caràcters." }),
  });
  const { getAllBooks, createBook, editBook, deleteBook } = useApi();
  const { data: llibres, refetch } = useQuery({
    queryKey: ["getBooks"],
    queryFn: getAllBooks,
    enabled: false,
  });
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
  const { mutate, isLoading } = useMutation({
    mutationFn: async (newBook: Book) => {
      if (id) return await editBook(id, newBook);
      return await createBook(newBook);
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Els canvis s'han guardat correctament.",
      });
      router.push("/library");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Els canvis no s'han pogut desar",
        description: "Hi ha hagut un error inesperat.",
      });
      console.log(error);
    },
  });

  //delete mutation
  const { mutate: deleteMutation } = useMutation({
    mutationFn: async () => {
      if (!id) return;
      const bookId = parseInt(id);
      const response = await deleteBook(bookId);
      return response;
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "El llibre s'ha eliminat correctament.",
      });
      router.push("/library");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "El llibre no s'ha pogut eliminar correctament.",
        description: "Hi ha hagut un error inesperat.",
      });
    },
  });

  async function onSubmit(values: any) {
    mutate(values);
  }

  useEffect(() => {
    if (id) {
      const book = llibres?.find((book: Book) => book.id === parseInt(id));
      form.setValue("titol", book?.titol);
      form.setValue("autor", book?.autor);
      form.setValue("prestatge", book?.prestatge);
      form.setValue("posicio", book?.posicio);
      form.setValue("habitacio", book?.habitacio);
      form.setValue("tipus", book?.tipus);
      form.setValue("editorial", book?.editorial);
      form.setValue("idioma", book?.idioma);
      form.setValue("notes", book?.notes);
    }
  }, [llibres]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <BarLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 ">
      <Link className="mr-auto pl-16 pb-10" href="/library">
        <Button variant={"link"}>{"<- Torna a la biblioteca"}</Button>
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-5">
        {id ? "Edita el llibre" : "Crea un nou llibre"}
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
          <div className="flex flex-row justify-between items-center">
            {id && (
              <Button variant={"outline"} onClick={() => deleteMutation()}>
                Elimina
              </Button>
            )}
            <Button type="submit" variant={"outline"}>
              Guarda
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBookForm;
