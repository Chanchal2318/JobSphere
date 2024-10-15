import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";


const CompaniesTable = () => {
  const {companies} = useSelector(store => store.company);
  const [filterCompany , setFilterCompany] = useState(companies);
  useEffect(()=>{
    
  })
  return (
    <div>
      <Table>
        <TableCaption>A list of recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar>
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
            </Avatar>
          </TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>14-10-2024</TableCell>
          <TableCell className="text-right cursor-pointer">
            <Popover>
                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                <PopoverContent className="w-32">
                    <div className="flex items-center gap-2 w-fit curor-pointer">
                        <Edit2 className="w-4"/>
                        <span>Edit</span>
                    </div>
                </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
