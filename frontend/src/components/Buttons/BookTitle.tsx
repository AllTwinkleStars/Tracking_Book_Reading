import { Book } from "../../context/book-types"

type Props = {
  bookItem: Book,
  showTitle: boolean,
  showCheck: boolean,
}

export const BookTitle = ({ bookItem, showTitle, showCheck }: Props) => {
  return (
    <div className={`inline-flex rounded-md shadow-sm`} role="group">
      <button type="button" disabled className={`text-blue-700 border border-blue-700 font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-blue-500 dark:text-blue-500 ${showTitle ? '' : 'hidden'}`}>{bookItem?.title}</button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${showCheck ? '' : 'hidden'}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>
  );

}