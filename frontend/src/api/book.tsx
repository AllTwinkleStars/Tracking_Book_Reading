import Axios from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import { Book } from '../context/book-types';

export const getAllBooks = async () => {
  try {
    const { data, status } = await Axios.get('api/getAllBooks');
    showErrorToast(status);
    return data;
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.status);
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
    const { data, status } = await Axios.post('api/addBook', book);
    showErrorToast(status);
    return data;
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.status);
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
    const { data, status } = await Axios.put(`api/updateBook/${book.id}`, book);
    showErrorToast(status);
    return data;
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.status);
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
    const { data, status } = await Axios.delete(`api/removeBook/${id}`);
    showErrorToast(status);
    return data;
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.status);
    } else if (error.request) {
      toast.error("Server No Response", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  return -1;
};

const showErrorToast = (status_code: number) => {
  switch (status_code) {
    case 200:
    case 201:
    case 202:
      toast.success("Action Success", {
        position: toast.POSITION.TOP_RIGHT,
      })
      break;
    case 401:
      toast.success(`${status_code} Error: Unauthenticated`, {
        position: toast.POSITION.TOP_RIGHT,
      })
      break;
    case 403:
      toast.error(`${status_code} Error: Unauthorized`, {
        position: toast.POSITION.TOP_RIGHT,
      })
      break;
    case 404:
      toast.error(`${status_code} Error: NOT FOUND`, {
        position: toast.POSITION.TOP_RIGHT,
      })
      break;
    case 409:
      toast.error(`${status_code} Error: OUT OF DATE`, {
        position: toast.POSITION.TOP_RIGHT,
      })
      break;
  }
}
