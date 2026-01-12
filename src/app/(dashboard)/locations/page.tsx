'use client';

import { useQuery } from '@tanstack/react-query';
import { Location, locationApis } from '@/lib/api/locations';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import LocationTree from '@/components/locations/LocationTree';
import { Button } from '@/components/common/Button';
import { Plus, MapPin, Bell, CircleQuestionMark, FolderOpen, Folder, ChevronRight, MoreVertical, Edit, Trash2 } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import { useEffect, useRef, useState } from 'react';

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null)

  const { data: locations, isLoading, error, refetch } = useQuery({
    queryKey: ['locations'],
    queryFn: () => locationApis.getLocations(),
  });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
  }, [selectedLocation])  

  return (
    <div>
        <div className="flex items-center justify-between h-19.75 bg-white border border-[#E2E8F0] px-8 py-4">
            <div className='flex flex-col lg:flex-row lg:items-center lg:w-[50%]'>
                <h1 className="text-2xl font-bold text-gray-900 mr-4">Locations</h1>
                <h1 className="text-[14px] text-[#64748B]">Organize your items by location</h1>
            </div>
            <div className='lg:flex items-center hidden'>
                <Bell size={18} className='mr-2'/>
                <CircleQuestionMark size={18}/>
            </div>
        </div>

        {
            isLoading ? <LoadingSpinner message="Loading locations..." /> : 
            error ? <div className='p-5'><ErrorDisplay error={error} onRetry={() => refetch()}/></div> : 
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1 bg-white border border-[#E2E8F0] min-h-[91.5vh]">
                    <div className='p-4 border border-[#E2E8F0]'>
                        <SearchBar 
                            value={searchTerm}
                            onChange={value => setSearchTerm(value)}
                            placeholder="Search items..."
                            className='w-full'
                        />
                    </div>
                    <div className='p-4 border border-[#E2E8F0]'>
                    <Button className='bg-[#3B82F6] text-white py-5 px-5 border border-[#CBD5E1] w-full'>
                        <Plus className="w-5 h-5 mr-2" />
                        New Location
                    </Button>
                    </div>
                    <div className="p-4">
                        {locations && locations.length > 0 ? (
                            <LocationTree locations={locations} onSelect={location => setSelectedLocation(location)}/>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No locations found</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    Add your first location to get started
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='lg:col-span-2 p-4'>
                    <div ref={scrollRef}/>
                    {selectedLocation && (
                        <div className="space-y-4 bg-white rounded-xl border border-[#E2E8F0] p-6 mb-6">
                            <div className="p-4">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center">
                                            {selectedLocation.children && selectedLocation.children.length > 0 ? (
                                                <FolderOpen className="h-6 w-6 text-primary-600" />
                                            ) : (
                                                <Folder className="h-6 w-6 text-primary-600" />
                                            )}
                                        </div>
                                        <div className='w-full'>
                                            <h3 className="font-semibold text-gray-900">{selectedLocation.name}</h3>
                                            <p className="text-sm text-gray-500">Location ID: {selectedLocation.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                                        <Button className='bg-white text-[#334155] py-2 px-5 border border-[#CBD5E1] w-full sm:w-auto'>
                                            <Edit className="w-3 h-3 mr-2" />
                                            Edit
                                        </Button>
                                        <Button className='bg-white text-[#334155] py-2 px-5 border border-[#CBD5E1] w-full sm:w-auto'>
                                            <Plus className="w-3 h-3 mr-2" />
                                            Add Child
                                        </Button>
                                        <Button className='bg-white text-red-600 py-2 px-5 border border-[#CBD5E1] w-full sm:w-auto'>
                                            <Trash2 className="w-3 h-3 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <p className='text-[12px] text-[#64748B]'>DESCRIPTION</p>
                                <p className="text-[14px] text-[#334155]">{selectedLocation.description || 'Description Here...'}</p>
                            </div>

                            <div className="p-4 space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">ITEMS</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {selectedLocation.item_count || 0}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">TOTAL VALUE</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ${selectedLocation.totalPrice || 0}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">CREATED</p>
                                        <p className="text-[14px] text-[#334155]">
                                            {selectedLocation.createdAt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedLocation && (
                        <div className="space-y-4 bg-white rounded-xl border border-[#E2E8F0] p-6 mb-6">
                            {selectedLocation.children && selectedLocation.children.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Items in this Location</h4>
                                <div className="space-y-2">
                                    {selectedLocation.children?.slice(0, 3)?.map((child: Location) => (
                                        <div
                                            key={child?.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                            onClick={() => setSelectedLocation(child)}
                                        >
                                        <Folder className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">{child?.name}</span>
                                        {child?.item_count && (
                                            <span className="ml-auto text-xs text-gray-500">
                                            {child?.item_count} items
                                            </span>
                                        )}
                                        </div>
                                    ))}
                                    {selectedLocation?.children?.length > 3 && (
                                        <p className="text-sm text-gray-500 text-center">
                                        +{selectedLocation.children.length - 3} more
                                        </p>
                                    )}
                                </div>
                            </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        }
    </div>
  );
}