import { Plus, Search, FileDown, MoreHorizontal } from 'lucide-react'
import { Header } from './components/header'
import { Tabs } from './components/tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Pagination } from './components/pagination'
import { useQuery } from '@tanstack/react-query'

export function App() {
  const { data: tagsResponse, isLoading } = useQuery({
    queryKey: ['get-tags'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=1&_per_page=10&title=10`)
      const data = await response.json()

      return data
    },
  })


  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6lx mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant='primary'>
            <Plus className='size-3' />
            Create new
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input variant='filter'>
            <Search className='size-3' />
            <Control placeholder='Search tags...' />
          </Input>

          <Button>
            <FileDown className='size-3' />
            Export
          </Button>
        </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Amount of videos</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((value, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0 5">
                        <span className="font-medium">react</span>
                        <span className="text-xs text-zinc-500">9E0E95BF-4BF6-4A23-B79E-F71AE9C9C117</span>
                      </div>
                      <TableCell className="text-zinc-300">
                        13 video(s)
                      </TableCell>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button size='icon'>
                        <MoreHorizontal className='size-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        
        <Pagination pages={0} items={0} page={0} />
      </main>
    </div>
  )
}

