"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Item = {
  id: number
  [key: string]: any
}

type ManagementPageProps = {
  title: string
  columns: { key: string; label: string }[]
  items: Item[]
  onAdd: (item: Omit<Item, "id">) => void
  onEdit: (item: Item) => void
}

export function ManagementPage({ title, columns, items, onAdd, onEdit }: ManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({})

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAdd = () => {
    onAdd(newItem)
    setNewItem({})
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {columns.map((column) => (
                <div key={column.key} className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor={column.key} className="text-right">
                    {column.label}
                  </label>
                  <Input
                    id={column.key}
                    value={newItem[column.key] || ""}
                    onChange={(e) => setNewItem({ ...newItem, [column.key]: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleAdd}>Add</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>{item[column.key]}</TableCell>
              ))}
              <TableCell>
                <Button onClick={() => onEdit(item)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

