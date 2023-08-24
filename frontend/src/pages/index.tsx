import { useState, useEffect } from 'react';
import Header from "../components/Header/Header";
import Button from "../components/Buttons/Button";
import { Book } from "../context/book-types";
import { useBook } from "../context/BookProvider";
import { BookTitle } from '@/components/Buttons/BookTitle';
import { toast } from 'react-toastify';

/* API import */
import { getAllBooks, addBook, updateBook, removeBook } from '@/api/book';

export default function Home() {

  const [bookTitle, setBookTitle] = useState("");
  const [bookList, setBookList] = useState<Book[]>([])

  useEffect(() => {
    const getBooks = async () => {
      const result = await getAllBooks();
      if (result === -1)
        return;
      const books = result;
      setBookList(books);
    }
    getBooks();
  }, [])

  const onAddBook = async (book: Book) => {
    const result = await addBook(book);
    if (result === -1)
      return;
    const data: Book = result;
    const updatedBookList = [data, ...bookList];
    setBookList(updatedBookList);
  }

  const onRemoveBook = async (book: Book) => {
    if (book.id) {
      const result = await removeBook(book.id);
      if (result === -1)
        return;
      const data: Book = result;
      const newBookList = bookList.filter(item => item.id !== data.id)
      setBookList(newBookList);
    }
  }

  const onChangeBook = async (book: Book) => {
    const result = await updateBook(book);
    if (result === -1)
      return;
    const data: Book = result;
    const newBookList = bookList.map(item => item.id === data.id ? data : item);
    setBookList(newBookList);
  }

  return (
    <>
      <Header title="Book Reading"></Header>

      <main id="main-content">
        <div className="app-max-width px-4 w-full border-t-2 border-gray-100">
          <h1 className="text-2xl mt-6 mb-2 animatee__animated animate__bounce">
            Book List
          </h1>
        </div>

        <div className="app-max-width px-4 py-4 w-full">
          <form className="h-full w-full">
            <input
              type="text"
              onChange={(e) => setBookTitle((e.target as HTMLInputElement).value)}
              className="border-2 border-gray500 py-2 px-4 outline-none"
              placeholder="Book Title"
            />
            <Button
              size="lg"
              value="Add Book"
              onClick={() => onAddBook({ title: bookTitle, shelves: 0 } as Book)}
              extraClass="ml-0 mt-4 sm:mt-0 tracking-widest sm:tracking-normal sm:mt-0 sm:ml-4 w-auto w-full sm:w-auto"
            />
          </form>
        </div>

        <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
          <div className="relative rounded-xl overflow-auto">
            <div className="app-max-width px-4 flex flex-col">
              <div className="h-full w-full mr-4">
                <div className="shadow-sm overflow-hidden my-8">
                  <div className="table border-collapse table-auto w-full text-sm">
                    <div className="table-header-group">
                      <div className="table-row">
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Book Title</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">To-Read</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">In-Progress</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Comleted</div>
                      </div>
                    </div>
                    <div className="table-row-group bg-white dark:bg-slate-800">
                      {
                        bookList && bookList.map((bookItem) => {
                          return (
                            <div className="table-row" key={bookItem.id}>
                              <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                <BookTitle showTitle={true} showCheck={false} bookItem={bookItem} />
                              </div>
                              <div className='table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                                <BookTitle showTitle={false} showCheck={Number(bookItem.shelves) === 1} bookItem={bookItem} />
                              </div>
                              <div className='table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                                <BookTitle showTitle={false} showCheck={Number(bookItem.shelves) === 2} bookItem={bookItem} />
                              </div>
                              <div className={`table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400`}>
                                <BookTitle showTitle={false} showCheck={Number(bookItem.shelves) === 3} bookItem={bookItem} />
                              </div>
                              <div className="inline-flex rounded-md shadow-sm table-cell border-b border-slate-100 dark:border-slate-700 px-6 py-4 whitespace-nowrap text-right text-sm font-medium" role="group">
                                <button
                                  type="button"
                                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-0.5 m-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 active:bg-blue-600`}
                                  disabled={bookItem.shelves === 0}
                                  onClick={() => {
                                    if (bookItem.shelves > 0) {
                                      const updatedBookItem = { ...bookItem, shelves: Number(bookItem.shelves) - 1 };
                                      onChangeBook(updatedBookItem);
                                    }
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => onRemoveBook(bookItem)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-0.5 m-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 active:bg-blue-600`}
                                  disabled={bookItem.shelves === 3}
                                  onClick={() => {
                                    if (bookItem.shelves < 3) {
                                      const updatedBookItem = { ...bookItem, shelves: Number(bookItem.shelves) + 1 };
                                      onChangeBook(updatedBookItem);
                                    }
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </>
  );
}
