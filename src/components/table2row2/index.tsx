"use client";
import * as React from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type Player = {
  sports: string;
  club: string;
  playerFirstName: string;
};

const defaultData: Player[] = [
  {
    sports: "Basketball",
    club: "Basketball Club",
    playerFirstName: "James",
  },
  {
    sports: "Basketball",
    club: "Basketball Club",
    playerFirstName: "Eric",
  },
  {
    sports: "Basketball",
    club: "Basketball Club",
    playerFirstName: "Smith",
  },
  {
    sports: "Basketball",
    club: "Pro Basketball Club",
    playerFirstName: "Scott",
  },
  {
    sports: "Basketball",
    club: "Pro Basketball Club",
    playerFirstName: "Elvin",
  },
];

const columnHelper = createColumnHelper<Player>();

const columns = [
  columnHelper.accessor("sports", {
    cell: (info) => info.getValue(),
    header: () => "Sports",
  }),
  columnHelper.accessor("club", {
    cell: (info) => info.getValue(),
    header: () => "Club",
  }),
  columnHelper.accessor("playerFirstName", {
    cell: (info) => info.getValue(),
    header: () => "Player First Name",
  }),
];

export function Table2Row2() {
  const [data] = React.useState(() => [...defaultData]);

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const mergedCells = React.useMemo(() => {
    const mergeInfo: { [key: string]: { rowStartIndex: number; count: number } } = {};
    data.forEach((row, index) => {
      if (!mergeInfo[row.sports]) {
        mergeInfo[row.sports] = { rowStartIndex: index, count: 1 };
      } else {
        mergeInfo[row.sports].count += 1;
      }

      if (!mergeInfo[row.club]) {
        mergeInfo[row.club] = { rowStartIndex: index, count: 1 };
      } else {
        mergeInfo[row.club].count += 1;
      }
    });
    return mergeInfo;
  }, [data]);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-400 p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === "sports") {
                  const sport = cell.getValue() as string;
                  const mergeData = mergedCells[sport];
                  if (mergeData.rowStartIndex === rowIndex) {
                    return (
                      <td
                        key={cell.id}
                        className="border border-gray-400 p-2"
                        rowSpan={mergeData.count}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  }
                  return null; // Skip this cell as it's merged with the previous row
                }

                if (cell.column.id === "club") {
                  const club = cell.getValue() as string;
                  const mergeData = mergedCells[club];
                  if (mergeData.rowStartIndex === rowIndex) {
                    return (
                      <td
                        key={cell.id}
                        className="border border-gray-400 p-2"
                        rowSpan={mergeData.count}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  }
                  return null; // Skip this cell as it's merged with the previous row
                }

                return (
                  <td key={cell.id} className="border border-gray-400 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
