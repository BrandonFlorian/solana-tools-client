"use client";
import React, { useState } from "react";
import { useTokenStore } from "@/store/pumpfunStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const filterConfig = {
  checkboxes: [
    { name: "hasTelegram", label: "Telegram" },
    { name: "hasTwitter", label: "Twitter" },
    { name: "hasWebsite", label: "Website" },
    { name: "hasKingOfTheHill", label: "King Of The Hill" },
    { name: "noKingOfTheHill", label: "No King Of The Hill" },
  ],
  textInputs: [{ name: "searchQuery", label: "Search" }],
  numberInputs: [
    { name: "minMarketCap", label: "Min Market Cap" },
    { name: "maxMarketCap", label: "Max Market Cap" },
    { name: "minReplies", label: "Min Replies" },
  ],
};

export const TokenFilters: React.FC = () => {
  const filters = useTokenStore((state) => state.filters);
  const setFilters = useTokenStore((state) => state.setFilters);
  const setSortOption = useTokenStore((state) => state.setSortOption);
  const [isOpen, setIsOpen] = useState(false);
  const [excludedWord, setExcludedWord] = useState("");

  const handleInputChange = (name: string, value: string | number) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFilters({ ...filters, [name]: checked });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addExcludedWord = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (excludedWord.trim() !== "") {
      setFilters({
        ...filters,
        excludedWords: [...(filters.excludedWords || []), excludedWord.trim()],
      });
      setExcludedWord("");
    }
  };

  const removeExcludedWord = (word: string) => {
    setFilters({
      ...filters,
      excludedWords: (filters.excludedWords || []).filter((w) => w !== word),
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader
        className="flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <h2 className="text-lg font-semibold">Filters</h2>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CardHeader>
      <CardContent
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <form className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {filterConfig.checkboxes.map((filter) => (
              <div key={filter.name} className="flex items-center space-x-2">
                <Checkbox
                  id={filter.name}
                  checked={!!filters[filter.name]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(filter.name, checked as boolean)
                  }
                />
                <Label htmlFor={filter.name}>{filter.label}</Label>
              </div>
            ))}
          </div>
          {filterConfig.textInputs.map((filter) => (
            <div key={filter.name}>
              <Label htmlFor={filter.name}>{filter.label}</Label>
              <Input
                id={filter.name}
                name={filter.name}
                value={(filters[filter.name] as string) || ""}
                onChange={(e) => handleInputChange(filter.name, e.target.value)}
              />
            </div>
          ))}
          <div>
            <Label htmlFor="excludedWords">Excluded Words</Label>
            <div className="flex space-x-2">
              <Input
                id="excludedWords"
                value={excludedWord}
                onChange={(e) => setExcludedWord(e.target.value)}
              />
              <Button onClick={addExcludedWord} type="button">
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(filters.excludedWords || []).map(
              (word: string, index: number) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => removeExcludedWord(word)}
                >
                  {word} <X className="h-4 w-4 ml-1" />
                </Button>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filterConfig.numberInputs.map((filter) => (
              <div key={filter.name}>
                <Label htmlFor={filter.name}>{filter.label}</Label>
                <Input
                  id={filter.name}
                  name={filter.name}
                  //type="number"
                  value={filters[filter.name] as string}
                  onChange={(e) =>
                    handleInputChange(filter.name, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <Label htmlFor="sortOption">Sort by</Label>
            <Select onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Select</SelectItem>
                <SelectItem value="highToLow">
                  Market Cap: High to Low
                </SelectItem>
                <SelectItem value="lowToHigh">
                  Market Cap: Low to High
                </SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
