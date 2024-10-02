"use client";
// Importing React
import React from 'react';

// Example Table Component
export const Table2Row: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Sports</th>
            <th className="border border-gray-400 p-2">Club</th>
            <th className="border border-gray-400 p-2">Player First Name</th>
          </tr>
        </thead>
        <tbody>
          {/* First Group (Basketball, Basketball Club) */}
          <tr>
            <td className="border border-gray-400 p-2" rowSpan={5}>
              Basketball
            </td>
            <td className="border border-gray-400 p-2" rowSpan={3}>
              Basketball Club
            </td>
            <td className="border border-gray-400 p-2">James</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">Eric</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">Smith</td>
          </tr>

          {/* Second Group (Basketball, Pro Basketball Club) */}
          <tr>
            <td className="border border-gray-400 p-2" rowSpan={2}>
              Pro Basketball Club
            </td>
            <td className="border border-gray-400 p-2">Scott</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">Elvin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};