import { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnOrderState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Table = (props: any) => {
  const { columns, data, setOffset, pageSize, setPageSize, loading } = props;

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      columnOrder,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      style={{
        width: "100%",
        overflowY: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          overflow: "auto",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
          borderColor: "#F8F9FA",
          backgroundColor: "white",
        }}
      >
        <thead
          style={{
            backgroundColor: "#DEE2E6",
            position: "sticky",
            top: 0,
          }}
        >
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index} style={{ fontSize: "0.875rem", fontWeight: "400" }}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: "0.5rem",
                    textAlign: "left",
                    fontWeight: "500",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ display: "flex" }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  width: "100%",
                  padding: "0.25rem",
                }}
              >
                <Skeleton
                  height={40}
                  count={pageSize}
                  style={{ backgroundColor: "black" }}
                />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={index}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={index}
                    style={{
                      paddingTop: "0.75rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid #E4E4E4",
                      textAlign: "left",
                      paddingLeft: "0.5rem",
                      paddingRight: "0.5rem",
                      wordBreak: "break-word",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div
        style={{
          marginTop: "0.5rem",
          width: "100%",
          backgroundColor: "white",
          padding: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            >
              {[5, 10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginLeft: "2.5rem" }}>
            <button
              style={{
                opacity: data?.previous === null ? "0.6" : "1",
                color: "light",
                fontSize: "0.875rem",
                padding: "0.25rem 0.5rem",
                borderRadius: "0 0.375rem 0.375rem 0",
                borderLeft: "none",
                cursor: data?.previous === null ? "not-allowed" : "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0.2s",
              }}
              onClick={() => setOffset((prev: any) => prev - 1)}
              disabled={data?.previous === null}
            >
              {"< Previous"}
            </button>
            <button
              style={{
                opacity: data?.next === null ? "0.6" : "1",
                color: "light",
                fontSize: "0.875rem",
                padding: "0.25rem 0.5rem",
                borderRadius: "0 0.375rem 0.375rem 0",
                borderRight: "none",
                cursor: data?.next === null ? "not-allowed" : "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0.2s",
              }}
              onClick={() => setOffset((prev: any) => prev + 1)}
              disabled={data?.next === null}
            >
              {"Next >"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
