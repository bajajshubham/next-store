import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllCategories } from '@/lib/actions/product.actions';
import { SearchIcon } from 'lucide-react';

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action='/search' method='GET'>
      <div className='flex flex-col gap-2 w-full max-w-sm items-center md:flex-row'>
        <Select name='category'>
          <SelectTrigger className='md:w-45 w-full'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem key={'All'} value={'all'}>
              All
            </SelectItem>
            {categories.map((x) => (
              <SelectItem key={x.category} value={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='flex gap-1'>
          <Input
            name='q'
            type='text'
            placeholder='Search...'
            className='md:w-25 lg:w-75'
          />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Search;