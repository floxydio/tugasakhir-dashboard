import React, { useEffect, useState } from 'react'
import { FetchHasilUlangan } from '../repository/HasilUlangan_api'

export default function HasilUlangan() {
    const [dataJawaban, setDataJawaban] = useState([])

    const fetchDataHasilUlangan = async () => {
        setDataJawaban([])
        await FetchHasilUlangan().then(res => {
            setDataJawaban(res.data)
        }).catch(err => {
            console.log('error', err)
        })

    }
    useEffect(() => {
        fetchDataHasilUlangan()
    }, [])



    return (
        <div>HasilUlangan</div>
    )
}
