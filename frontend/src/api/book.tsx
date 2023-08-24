import Axios from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import { Book } from '../context/book-types';

export const getAllBooks = async () => {
  try {
    const { data } = await Axios.get('api/getAllBooks');
    return data;
  } catch (error: any) {
    if (error.response) {
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (error.request) {
      toast.error("Server No Response", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return -1;
  }
};

export const addBook = async (book: Book) => {
  try {
    const { data } = await Axios.post('api/addBook', book);
    return data;
  } catch (error: any) {
    if (error.response) {
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (error.request) {
      toast.error("Server No Response", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return -1;
  }
};

export const updateBook = async (book: Book) => {
  try {
    const { data } = await Axios.put(`api/updateBook/${book.id}`, book);
    return data;
  } catch (error: any) {
    if (error.response) {
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (error.request) {
      toast.error("Server No Response", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return -1;
  }
};

export const removeBook = async (id: number) => {
  try {
    const { data } = await Axios.delete(`api/removeBook/${id}`);
    return data;
  } catch (error: any) {
    if (error.response) {
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (error.request) {
      toast.error("Server No Response", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  return -1;
};
