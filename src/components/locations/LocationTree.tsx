'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import { Location } from '@/lib/api/locations';
import { cn } from '@/lib/utils/helpers';

interface LocationTreeProps {
  locations: Location[];
  selectedId?: string;
  onSelect?: (location: Location) => void;
}

export default function LocationTree({
  locations,
  selectedId,
  onSelect,
}: LocationTreeProps) {
  return (
    <div className="space-y-1">
      {locations.map((location) => (
        <LocationNode
          key={location.id}
          location={location}
          selectedId={selectedId}
          onSelect={onSelect}
          level={0}
        />
      ))}
    </div>
  );
}

interface LocationNodeProps {
  location: Location;
  selectedId?: string;
  onSelect?: (location: Location) => void;
  level: number;
}

function LocationNode({
  location,
  selectedId,
  onSelect,
  level,
}: LocationNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = location.children && location.children.length > 0;

  return (
    <div>
      <div
        onClick={() => onSelect?.(location)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors',
          selectedId === location.id
            ? 'bg-primary-50 text-primary-700'
            : 'hover:bg-gray-100'
        )}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-4" />}
        {isExpanded ? (
          <FolderOpen className="h-4 w-4 text-primary-500" />
        ) : (
          <Folder className="h-4 w-4 text-gray-500" />
        )}
        <span className="font-medium">{location.name}</span>
        {location.item_count !== undefined && (
          <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {location.item_count} items
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {location.children!.map((child:Location) => (
            <LocationNode
              key={child?.id}
              location={child}
              selectedId={selectedId}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}