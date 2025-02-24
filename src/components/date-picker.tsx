"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from "react"

type DateProps = {
    date: Date;
    onDateChange: (date: Date) => void;
}

export function DatePicker({ date, onDateChange }: DateProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(date);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        setSelectedDate(date)
    }, [date]);

    function handleDateChange(date: Date | undefined) {
        if (date) {
            setSelectedDate(date);
            onDateChange(date);
            setIsPopoverOpen(false);
        }
    }

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>Selecione a data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    className="relative"
                    initialFocus
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    locale={ptBR}
                />
            </PopoverContent>
        </Popover>
    )
}