import { toast } from 'react-toastify';

export const notFound = searchQuery => {
  toast.info(`No results were found for ${searchQuery}`);
};
