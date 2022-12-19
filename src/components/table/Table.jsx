import "./table.scss"
import { tData } from "../../data/tableData.js"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const TableComponent = () => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="tableRowHead">
            <TableCell className="tableCell" align="center">
              Tracking ID
            </TableCell>
            <TableCell className="tableCell" align="center">
              Product
            </TableCell>
            <TableCell className="tableCell" align="center">
              Customer
            </TableCell>
            <TableCell className="tableCell" align="center">
              Date
            </TableCell>
            <TableCell className="tableCell" align="center">
              Amount
            </TableCell>
            <TableCell className="tableCell" align="center">
              Payment Method
            </TableCell>
            <TableCell className="tableCell" align="center">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell" align="center">
                {row.id}
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="product" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell" align="center">
                {row.customer}
              </TableCell>
              <TableCell className="tableCell" align="center">
                {row.date}
              </TableCell>
              <TableCell className="tableCell" align="center">
                {row.amount}
              </TableCell>
              <TableCell className="tableCell" align="center">
                {row.method}
              </TableCell>
              <TableCell className="tableCell" align="center">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
