import React, { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import ShoppingOrderDetailsView from './ShoppingOrderDetailsView'
import { Dialog } from '../ui/dialog'

const ShoppingOrders = () => {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (


    <Card>
        <CardHeader>
            <CardTitle>All Orders </CardTitle>
        </CardHeader>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead className='hidden md:block'>Order Date</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Order Price</TableHead>
                    <TableHead>
                        <span className='sr-only'>Details</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>342323523</TableCell>
                    <TableCell className='hidden md:block'>12/1/3131</TableCell>
                    <TableCell>pending</TableCell>
                    <TableCell>$2442</TableCell>
                    <TableCell>
                        <Dialog open={openDetailsDialog}
                            onOpenChange={setOpenDetailsDialog}>
                            <Button onClick={()=>setOpenDetailsDialog(true)}
                                className='px-2 md:px-4'>Details</Button>
                            <ShoppingOrderDetailsView />
                        </Dialog>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Card>
  )
}

export default ShoppingOrders