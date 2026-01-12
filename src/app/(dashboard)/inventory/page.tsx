'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import EmptyState from '@/components/common/EmptyState';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/common/Button';
import { Plus, Filter, Download, X, Package, MapPin, Tag, Eye, Edit, Trash2 } from 'lucide-react';
import { Item, itemsApi } from '@/lib/types';
import TableSkeleton from '@/components/items/TableSkeleton';

const InventoryPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    q: '',
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['items', params],
    queryFn: () => itemsApi.getAllItems(params),
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleItemClick = (itemId: string) => {
    router.push(`/items/${itemId}`);
  };

  return (
    <div>
      <div className="bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4">
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-[50%]'>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">Inventory</h1>
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search items..."
            className='w-full'
          />
        </div>
        <div className='flex flex-col lg:flex-row gap-3 w-full sm:w-auto'>
            <Button className='w-full sm:w-auto justify-center py-3 sm:py-2 border border-[#CBD5E1] text-[#334155]'>
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Export
            </Button>
            <Button className='w-full sm:w-auto justify-center py-3 sm:py-2 bg-[#3B82F6] text-white'>
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Add Item
            </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 sm:px-6     lg:px-8 bg-white border border-[#E2E8F0]">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-[#334155] whitespace-nowrap">Filters:</span>
            <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-lg bg-[#EFF6FF] text-xs sm:text-sm text-[#3B82F6] py-1 px-2 sm:px-3">
                    All Locations
                    <X size={12} className="ml-1 sm:ml-2" />
                </span>
                <span className="inline-flex items-center rounded-lg bg-[#EFF6FF] text-xs sm:text-sm text-[#3B82F6] py-1 px-2 sm:px-3">
                    In Stock
                    <X size={12} className="ml-1 sm:ml-2" />
                </span>
                <span className="inline-flex items-center rounded-lg border border-[#CBD5E1] text-xs sm:text-sm text-[#334155] py-1 px-2 sm:px-3">
                    <Plus size={12} className="mr-1 sm:mr-2" />
                    Add Filter
                </span>
            </div>
        </div>
    
        <div className="text-right w-full sm:w-auto">
            <p className="text-xs sm:text-sm text-[#475569]">
                0 items
            </p>
        </div>
      </div>
      {
        isLoading ? <div className="space-y-6 mt-28.75 mx-8">
            <TableSkeleton />
        </div> : 
            error ? <div className='p-5'><ErrorDisplay error={error} onRetry={() => refetch()}/></div> : 
            (!data?.items?.length && !searchTerm) ? <EmptyState
                title="No items found"
                message="Get started by adding your first item"
                actionText="Add Item"
                onAction={() => console.log('Add item')}
            /> : 
            <>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-28.75 mx-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    >
                                        <div className="flex items-center gap-1">
                                            <input type='checkbox'/>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>Item</span>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Location
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Labels
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>Quantity</span>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>Updated</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data?.items.map((item: Item) => (
                                    <tr
                                        key={item?.id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleItemClick(item.id)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <input type='checkbox'/>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                                    <Package className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </div>
                                                    {item.description && (
                                                        <div className="text-sm text-gray-500 truncate max-w-xs">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.location ? (
                                            <div className="flex items-center text-sm text-gray-900">
                                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                {item.location.name}
                                            </div>
                                            ) : (
                                            <span className="text-sm text-gray-500">No location</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.labels && item.labels.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {item.labels.slice(0, 2).map((label: any, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                                    >
                                                        <Tag className="w-3 h-3 mr-1" />
                                                        {label.name}
                                                    </span>
                                                    ))}
                                                    {item.labels.length > 2 && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                        +{item.labels.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                            ) : (
                                            <span className="text-sm text-gray-400">No labels</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(item.updatedAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleItemClick(item.id);
                                                    }}
                                                    className="text-gray-400 hover:text-gray-600 p-1"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('Edit', item.id);
                                                    }}
                                                    className="text-gray-400 hover:text-gray-600 p-1"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('Delete', item.id);
                                                    }}
                                                    className="text-gray-400 hover:text-red-600 p-1"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION */}
                {data && data.total > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <Button
                                variant="outline"
                                onClick={() => setParams({ ...params, page: (params.page || 1) - 1 })}
                                disabled={params.page === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setParams({ ...params, page: (params.page || 1) + 1 })}
                                disabled={params.page === data?.total}
                            >
                                Next
                            </Button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{((params.page || 1) - 1) * (params.pageSize || 20) + 1}</span> to{' '}
                                    <span className="font-medium">
                                    {Math.min((params.page || 1) * (params.pageSize || 20), (data?.total || 0))}
                                    </span>{' '}
                                    of <span className="font-medium">{data?.total}</span> results
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setParams({ ...params, page: (params.page || 1) - 1 })}
                                    disabled={params.page === 1}
                                >
                                    Previous
                                </Button>
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: Math.min(5, (data?.total || 0)) }, (_, i) => {
                                    let pageNum = 0;
                                    if ((data?.total || 0) <= 5) {
                                        pageNum = i + 1;
                                    } else if ((params.page || 1) <= 3) {
                                        pageNum = i + 1;
                                    } else if ((params.page || 1) >= (data?.total || 0) - 2) {
                                        pageNum = (data?.total || 0) - 4 + i;
                                    } else {
                                        pageNum = (params.page || 1) - 2 + i;
                                    }

                                    return (
                                        <Button
                                        key={pageNum}
                                        variant={pageNum === (params.page || 1) ? 'default' : 'outline'}
                                        onClick={() => setParams({ ...params, page: pageNum })}
                                        size="sm"
                                        >
                                        {pageNum}
                                        </Button>
                                    );
                                    })}
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setParams({ ...params, page: (params.page || 1) + 1 })}
                                    disabled={params.page === data?.total}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        }
    </div>
  );
}

export default InventoryPage