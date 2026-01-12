'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Item, itemsApi } from '@/lib/api/items';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import { Button } from '@/components/common/Button';
import { ArrowLeft, Edit, Trash2, Package, MapPin, Tag, FileText, Edit2, Delete, ChevronRight, Paperclip, Calendar, Calendar1 } from 'lucide-react';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: item, isLoading, error } = useQuery({
    queryKey: ['item', id],
    queryFn: () => itemsApi.getItemById(id as string),
    enabled: !!id,
  });

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E2E8F0] px-8 py-3">
            <div className='flex items-center w-[50%]'>
                <h1 className="text-[14px] text-[#64748B]">Inventory <ChevronRight size={14} className='inline'/> <span className="text-[14px] text-[#0F172A]">{item?.name || 'Item name'}</span></h1>
            </div>
            <div className='flex flex-col lg:flex-row gap-2 w-full sm:w-auto'>
                <Button className='bg-white text-[#334155] py-2 px-5 border border-[#CBD5E1] w-full sm:w-auto'>
                    <Edit2 className="w-3 h-3 mr-2" />
                    Edit
                </Button>
                <Button className='bg-white text-[#334155] py-2 px-5 border border-[#CBD5E1] w-full sm:w-auto'>
                    <Paperclip className="w-3 h-3 mr-2" />
                    Add Attachment
                </Button>
                <Button className='bg-white text-red-600 py-2 px-5 border border-[#CBD5E1] w-full sm:w-auto'>
                    <Trash2 className="w-3 h-3 mr-2" />
                    Delete
                </Button>
            </div>
        </div>

        {
            isLoading ? <LoadingSpinner message="Loading item details..." /> :
            error ? <div className='m-6'><ErrorDisplay error={error}/></div> :
            !item ? <div className="text-center py-12"><p className="text-gray-500">Item not found</p></div> :
            <div className="m-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                        <div>
                            <h1 className="text-[30px] font-bold text-[#0F172A] m-0">{item?.name}</h1>
                            {item?.description && (
                                <p className="bg-[#DBEAFE] text-[#1D4ED8] text-[12px] px-3 py-1 rounded-full text-center">{item?.description}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4 bg-white rounded-xl border border-[#E2E8F0] p-6">
                        <div className='bg-[#F1F5F9] h-full rounded-xl'></div>
                    </div>

                    <div className="space-y-4 bg-white rounded-xl border border-[#E2E8F0] p-6">
                        <h1 className='text-[18px] font-semibold'>Key Details</h1>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-gray-500">Location</p>
                            <div className='flex items-center gap-1'>
                                <MapPin className="w-4 h-4 text-gray-600" />
                                <p className="font-[16px]">
                                    {item?.location?.name || 'Not specified'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-gray-500">Labels</p>
                            <div className='flex items-center gap-1'>
                                <Tag className="w-4 h-4 text-gray-600" />
                                <p className="text-[16px]">
                                    {item?.labels && item?.labels.length > 0 ? (
                                        item?.labels.map((label: any, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-xl text-sm"
                                        >
                                            {label?.name}
                                        </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">No labels</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-gray-500">Quantity</p>
                            <div className='flex items-center gap-1'>
                                <p className="text-[16px]">
                                    {item?.quantity || 0}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-gray-500">Purchased Date</p>
                            <div className='flex items-center gap-1'>
                                <Calendar1 className="w-4 h-4 text-gray-600" />
                                <p className="text-[16px]">
                                    {item?.purchaseTime || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-gray-500">Purchased Price</p>
                            <div className='flex items-center gap-1'>
                                <p className="text-[16px] font-semibold">
                                    $ {item?.purchasePrice || 0}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-gray-500">Warranty</p>
                            <div className='flex items-center gap-1'>
                                <p className="bg-[#DCFCE7] text-[#1D4ED8] text-[12px] px-3 py-1 rounded-full text-center">
                                    Active until {item?.warrantyExpires || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-gray-500">Notes</p>
                            <div className='flex items-center gap-1'>
                                <p className="text-[14px] text-[#475569]">
                                    {item?.notes || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  );
}