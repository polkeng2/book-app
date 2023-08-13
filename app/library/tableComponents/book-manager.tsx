'use client'

import React from 'react'
import { DataTable } from './book-table';
import { columns } from './columns';

export interface SearchParams {
    id: string;
    search: string;
}

export default function BookManager(books: any) {
  return (
    <>
      <DataTable columns={columns} data={books.books}/>
    </>
  )
}
