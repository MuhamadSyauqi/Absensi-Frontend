import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Pagination } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { semuaKaryawan, hapusKaryawan } from '@/services/KaryawanApi';

interface UserProfile {
  nama: string;
  email: string;
  peran: string;
}

function DaftarKaryawan() {
  const [dataKaryawan, setDataKaryawan] = useState<UserProfile[]>([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const data = useSelector((state: any) => state.data.data)
  const router = useRouter()
  const user: UserProfile = data;


  const handleRemove = (email: string) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return hapusKaryawan(email);
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Berhasil Menghapus Data!.',
            'success'
          )
          ambilData();
        }
      })

  }

  const ambilData = async () => {
    try {
      const respon = await semuaKaryawan(page)
      setDataKaryawan(respon.data)
      setTotalPages(respon.totalHalaman);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === 'undefined' || typeof data.nama === 'undefined') {
        router.push('/')
        return
      }
      ambilData()
    }
    cekProfil()
  }, [data, page]) 

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">Daftar Karyawan</Typography>
        <Paper sx={{ width: '100%', overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Peran</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataKaryawan.map((Karyawan) => (
                <TableRow key={Karyawan.email}>
                  <TableCell>{Karyawan.email}</TableCell>
                  <TableCell>{Karyawan.nama}</TableCell>
                  <TableCell>{Karyawan.peran}</TableCell>
                  <TableCell><Button onClick={() => handleRemove(Karyawan.email)} variant='text'><DeleteIcon /></Button></TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          </Table>
        </Paper>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 3 }}
        />
      </Container>
    </Layout>
  );
}

export default DaftarKaryawan;
