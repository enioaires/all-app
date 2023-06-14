/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FC, useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  onActive: () => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage: currentPageProps,
  onActive,
}) => {
  const { currentPage, setCurrentPage, onNext, onPrev } = usePagination();

  useEffect(() => {
    setCurrentPage(currentPageProps ? currentPageProps : 1);
  }, [currentPageProps]);

  const [activePage, setActivePage] = useState(currentPage);

  const MAX_SHOWN_PAGES = 3;

  const pages = Array.from(Array(totalPages).keys());

  if (pages.length > MAX_SHOWN_PAGES) {
    if (activePage === 1) {
      pages.splice(MAX_SHOWN_PAGES, pages.length - MAX_SHOWN_PAGES);
    } else if (activePage === totalPages) {
      pages.splice(0, pages.length - MAX_SHOWN_PAGES);
    } else {
      pages.splice(0, activePage - 2);
      pages.splice(MAX_SHOWN_PAGES, pages.length - MAX_SHOWN_PAGES);
    }
  }

  const handleOnNext = () => {
    if (activePage === totalPages) return;
    onNext();
  };

  const handleOnPrev = () => {
    if (activePage === 1) return;
    onPrev();
  };

  const handleActivePage = (page: number) => {
    if (page === activePage) return;
    onActive();
    setActivePage(page);
  };

  useEffect(() => {
    handleActivePage(currentPage);
  }, [currentPage]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={handleOnPrev}
            className="block h-9 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <ChevronLeft size={14} color="white" />
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <p
              onClick={() => setCurrentPage(page + 1)}
              className={clsx(
                "px-3 h-9 py-2 leading-tight text-white bg-gray-800 border border-gray-700 hover:bg-gray-300 hover:text-gray-700",
                activePage === page + 1 &&
                  "bg-gray-300 text-gray-700 cursor-default",
                activePage !== page + 1 && "cursor-pointer"
              )}
            >
              {page + 1}
            </p>
          </li>
        ))}
        <li>
          <button
            onClick={handleOnNext}
            className="block h-9 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <ChevronRight size={14} color="white" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
