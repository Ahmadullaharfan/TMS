import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Loader2, Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from './input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';

export interface SearchableOption {
  value: string | number;
  label: string;
  description?: string;
}

interface SearchableSelectProps {
  value?: string | number;
  onChange: (value: string | number, option?: SearchableOption) => void;
  options?: SearchableOption[];
  loadOptions?: (search: string) => Promise<SearchableOption[]>;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  onCreateNew?: () => void;
  createNewLabel?: string;
  loading?: boolean;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  className?: string;
  name?: string;
  required?: boolean;
}

export function SearchableSelect({
  value,
  onChange,
  options = [],
  loadOptions,
  placeholder = 'Select...',
  label,
  error,
  disabled = false,
  clearable = true,
  creatable = false,
  onCreateNew,
  createNewLabel = 'Create new',
  loading: externalLoading,
  searchPlaceholder = 'Search...',
  noResultsMessage = 'No results found',
  className = '',
  name,
  required = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [internalOptions, setInternalOptions] = useState<SearchableOption[]>(options);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const debouncedSearch = useDebounce(search, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedOption = internalOptions.find((opt) => opt.value === value);

  useEffect(() => {
    if (loadOptions && open) {
      const fetchOptions = async () => {
        setLoading(true);
        try {
          const results = await loadOptions(debouncedSearch);
          setInternalOptions(results);
        } catch (fetchError) {
          console.error('Failed to load options:', fetchError);
          setInternalOptions([]);
        } finally {
          setLoading(false);
        }
      };

      fetchOptions();
    } else if (!loadOptions) {
      const filtered = options.filter((opt) =>
        opt.label.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setInternalOptions(filtered);
    }
  }, [loadOptions, debouncedSearch, open, options]);

  useEffect(() => {
    if (!open) {
      setSearch('');
      setHighlightedIndex(-1);
      return;
    }

    const timer = setTimeout(() => searchInputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightedIndex]);

  const handleSelect = (option: SearchableOption) => {
    onChange(option.value, option);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onChange('', undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < internalOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && internalOptions[highlightedIndex]) {
          handleSelect(internalOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
      case 'Tab':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const isLoading = loading || externalLoading;
  const listboxId = `searchable-select-${name || 'listbox'}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium">
          {label}
          {required && <span className="mr-1 text-red-500">*</span>}
        </label>
      )}

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={`
              flex h-10 w-full items-center justify-between rounded-md border
              bg-background px-3 py-2 text-sm ring-offset-background
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50
              ${error ? 'border-red-500' : 'border-input'}
              ${open ? 'ring-2 ring-ring ring-offset-2' : ''}
            `}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby={label ? `${name}-label` : undefined}
            aria-describedby={error ? `${name}-error` : undefined}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <div className="flex items-center gap-1">
              {clearable && selectedOption && (
                <X
                  className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100"
                  onClick={handleClear}
                  aria-label="Clear selection"
                />
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)] text-right p-0"
          sideOffset={4}
        >
          <div className="flex items-center border-b p-2 w-full">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full text-right"
              aria-controls={listboxId}
              aria-autocomplete="list"
            />
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin opacity-50" />
            )}
          </div>

          <div
            id={listboxId}
            role="listbox"
            className="max-h-60 overflow-y-auto p-1"
            aria-activedescendant={
              highlightedIndex >= 0
                ? `option-${internalOptions[highlightedIndex]?.value}`
                : undefined
            }
          >
            {internalOptions.length > 0 ? (
              internalOptions.map((option, index) => (
                <div
                  key={option.value}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  role="option"
                  id={`option-${option.value}`}
                  aria-selected={option.value === value}
                  className={`
                    relative flex cursor-pointer items-center rounded-sm px-2 py-2
                    text-sm outline-none transition-colors
                    hover:bg-accent hover:text-accent-foreground
                    ${option.value === value ? 'bg-accent/50' : ''}
                    ${highlightedIndex === index ? 'bg-accent' : ''}
                  `}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {option.value === value && <Check className="mr-2 h-4 w-4" />}
                </div>
              ))
            ) : (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  noResultsMessage
                )}
              </div>
            )}

            {creatable && onCreateNew && !isLoading && (
              <>
                {internalOptions.length > 0 && <div className="my-1 border-t" />}
                <Button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-black "
                  onClick={() => {
                    onCreateNew();
                    setOpen(false);
                  }}
                >
                  <span className="">+</span>
                  <span>{createNewLabel}</span>
                </Button>
              </>
            )}
          </div>

          <div className="border-t p-2 text-xs text-muted-foreground">
            <kbd className="rounded border bg-muted px-1">Enter</kbd> select{' '}
            <kbd className="mr-2 rounded border bg-muted px-1">Up/Down</kbd> navigate{' '}
            <kbd className="rounded border bg-muted px-1">Esc</kbd> close
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
