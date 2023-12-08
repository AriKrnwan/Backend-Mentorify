// const jadwals = [
//     {
//         id: 1,
//         title: "woi",
//         descriptions: "anu"
//     },
//     {
//         id: 2,
//         title: "ha",
//         descriptions: "p"
//     },
//     {
//         id: 3,
//         title: "he",
//         descriptions: "apa"
//     },
//     {
//         id: 4,
//         title: "ho",
//         descriptions: "eg"
//     },
// ]

// const findAllJadwals = (req, res)=> {
//     const data = jadwals
//     const result = {
//         status: "ok",
//         data: data
//     }

//     res.json(result)
// }

// const getJadwalById =(req, res) => {
//     // MENGAMBIL REQ PARAMS
//     const { id } = req.params

//     let jadwal
//     // PROSES LOOP DATA
//     for (let i = 0; i < jadwals.length; i++) {
//         // jika data jadwals id sama dengan id yang ada req.params, maka dia akan menyimpan / menggunakan data tsb
//         if (jadwals[i].id === Number(id)) {
//             jadwal = jadwals[i]
//         }
//     }

//     // Jika data tidak ada di database
//     if (jadwal === undefined) {
//         return res.status(404).json({ status: 'failed', message: 'data not found' })
//     }

//     res.json({ status: 'ok', data: jadwal })
// }

// const createNewJadwals = (req, res) => {
//     // mendapatkan request body
//     const { title, descriptions } = req.body
//     console.log(title, descriptions)

//     // mendapatkan new id
//     const lastItemJadwalID = jadwals[jadwals.length - 1].id
//     const newIdJadwal = lastItemJadwalID + 1

//     // menambahkan new jadwal
//     const newJadwalData = { id: newIdJadwal, title: title, descriptions: descriptions }
//     jadwals.push(newJadwalData)

//     // mengembalikan response ke client
//     res.status(201).json({ status: 'ok', message: 'berhasil menambahkan data jadwal baru', data: newJadwalData })
// }


// module.exports = {findAllJadwals, getJadwalById, createNewJadwals}