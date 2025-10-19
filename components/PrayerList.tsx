import React, { useState, useMemo, useEffect } from 'react';
import type { GenericContent, MultilingualString } from '../types';
import Pagination from './Pagination';

interface GenericContentListProps {
  items: GenericContent[];
  onSelectItem: (item: GenericContent) => void;
  getML: (textObj: MultilingualString | undefined) => string;
  isAdmin: boolean;
  onAddNew: () => void;
  title: MultilingualString;
}

const ITEMS_PER_PAGE = 15;

const GenericContentList: React.FC<GenericContentListProps> = ({ items, onSelectItem, getML, isAdmin, onAddNew, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    const lowercasedFilter = searchTerm.toLowerCase();
    // FIX: Add type check to ensure values from MultilingualString are strings before calling toLowerCase.
    return items.filter(item => 
        Object.values(item.title).some(t => typeof t === 'string' && t.toLowerCase().includes(lowercasedFilter))
    );
  }, [items, searchTerm]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };


  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--text-accent)]">
            {getML(title)}
        </h2>
        <div className="mt-4 flex justify-center items-center space-x-4">
            {isAdmin && (
                <button
                    onClick={onAddNew}
                    className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 font-semibold flex items-center"
                    >
                    <i className="fas fa-plus-circle mr-2"></i>{getML({ vi: 'Thêm Mục Mới', en: 'Add New Item' })}
                </button>
            )}
        </div>
      </div>

      {items.length > 0 && (
        <div className="sticky top-[80px] z-[5] bg-[var(--bg-primary)] py-4 mb-6 -mx-4 px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-search text-[var(--text-secondary)]"></i>
              </div>
              <input
                type="text"
                placeholder={getML({ vi: "Tìm kiếm...", en: "Search items..." })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--bg-tertiary)] rounded-lg shadow-sm py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:border-[var(--border-accent)] transition-all duration-300"
                aria-label={getML({ vi: "Tìm kiếm", en: "Search" })}
              />
            </div>
        </div>
      )}

      {paginatedItems.length > 0 ? (
        <div className="space-y-3">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="p-4 rounded-lg shadow-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer flex items-center justify-between"
              role="button"
              aria-label={`${getML({ vi: 'Chọn', en: 'Select' })} ${getML(item.title)}`}
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{getML(item.title)}</h3>
              <i className="fas fa-chevron-right text-gray-500"></i>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="fas fa-folder-open fa-3x text-[var(--text-secondary)] mb-4"></i>
          <p className="text-[var(--text-secondary)]">
            {items.length > 0
              ? getML({ vi: 'Không tìm thấy mục nào phù hợp.', en: 'No matching items found.' })
              : getML({ vi: 'Chưa có mục nào được thêm vào.', en: 'No items have been added yet.' })
            }
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GenericContentList;