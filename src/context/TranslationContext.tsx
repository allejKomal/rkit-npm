import { createContext, useContext } from "react";

export interface TranslationContext {
  confirmationPopup?: {
    color?: "default" | "muted" | "destructive" | "secondary" | undefined;
  };
  formSection: {
    addNew: string;
  };
  groupedDropdown: {
    selectAll: string;
    more: string;
    noOptions: string;
    commandInputPlaceholder: string;
    placeholder?: string;
    clearSelected?: string;
  };
  multiSelectDropdown: {
    selectAll: string;
    more: string;
    noOptions: string;
    commandInputPlaceholder: string;
    placeholder?: string;
    clearSelected?: string;
  };
  paginatedSearchMultiSelectDropdown: {
    more: string;
    loading: string;
    commandInputPlaceholder: string;
    noOptions: string;
    placeholder?: string;
    clearSelected?: string;
  };
  paginatedSearchSingleSelectDropdown: {
    loading: string;
    noOptions: string;
    commandInputPlaceholder: string;
    placeholder?: string;
  };
  searchMultiSelectDropdown: {
    noOptions: string;
    clearSelected?: string;
  };
  searchSingleSelectDropdown: {
    noOptions: string;
    placeholder?: string;
  };
  noDataFound: {
    noDataText: string;
  };
  dataTablePagination: {
    showText: string;
    totalCountText: string;
    loadingText: string;
    pageText: string;
    ofText: string;
    goToFirstPageText: string;
    goToPreviousPageText: string;
    goToNextPageText: string;
    goToLastPageText: string;
    pagesText: string;
  };
  dataTable: {
    noDataText: string;
    columns: string;
    selectAll: string;
    selectRow: string;
  };
  singleSelectDropdown: {
    noOptions: string;
    placeholder?: string;
  };
  headerSearchInput?: {
    searchResults: string;
    noResults: string;
    view: string;
    moreResults: string;
    searchResultsDialogTitle: string;
    allTab: string;
  };
  searchBar?: {
    searchPlaceholder?: string;
  };
  formInputWithDropdown?: {
    inputPlaceholder?: string;
    dropdownPlaceholder?: string;
  };
}

export const TranslationContext = createContext<TranslationContext | null>(
  null
);

export const useTranslationContext = (): TranslationContext => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslation must be used within UiTextContext.Provider"
    );
  }
  return context;
};
