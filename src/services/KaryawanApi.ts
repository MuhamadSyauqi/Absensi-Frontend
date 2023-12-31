import { API_BASE_URL, getToken } from "./configService";


export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/karyawan/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const data = await response.json()
    let pesanError = `Login gagal: ${response.status} ${response.statusText}`
    if (typeof data !== 'undefined' && typeof data.message === 'string') {
      pesanError = data.message
    }
    throw new Error(pesanError);
  }
}

export const profil = async () => {
  const response = await fetch(`${API_BASE_URL}/karyawan/profil`, {
    headers: {
      'Authorization': getToken(),
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Profil gagal: ${response.status} ${response.statusText}`);
  }
}

export const registrasiKaryawan = async (nama: string, email: string, password: string, peran: string) => {
  const response = await fetch(`${API_BASE_URL}/karyawan`, {
    method: 'POST',
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nama, email, password, peran }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Lis Karyawan gagal: ${response.status} ${response.statusText}`);
  }
}

export const semuaKaryawan = async (halaman: number = 1) => {
  const response = await fetch(`${API_BASE_URL}/karyawan?halaman=${halaman}`, {
    headers: {
      'Authorization': getToken(),
    },
  });

  if (response.ok) {
    // console.log(await response.json());
    return await response.json();
  } else {
    throw new Error(`Lis Karyawan gagal: ${response.status} ${response.statusText}`);
  }
}


export const hapusKaryawan = async (email:string) => {
  const response = fetch(`${API_BASE_URL}/karyawan/hapus/${email}`, {
    method: "DELETE",
    headers: {
      'Authorization': getToken(),
    },
  });


  return response;
}