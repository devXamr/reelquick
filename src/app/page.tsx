'use client'
import {useState} from "react";
import axios, * as other from "axios"


export default function Home() {
    const [reelUrl, setReelUrl] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')

    async function handleSubmit(){
        const options = {
            method: 'GET',
            url: 'https://instagram-reels-downloader-api.p.rapidapi.com/download',
            params: {
                url: reelUrl
            },
            headers: {
                'x-rapidapi-key': '4e789c6d92mshe5f2f3f5a604071p1aa04cjsnc7b7864208ba',
                'x-rapidapi-host': 'instagram-reels-downloader-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const downloadUrl = response.data.data.medias[0].url
            console.log(downloadUrl)
            setDownloadUrl(downloadUrl)


        } catch (error) {
            console.error(error);
        }

    }

    return (
    <div>
        <div>Insta Reel Downloader</div>
        <div>Paste in your instagram reel below</div>

        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <input value={reelUrl} onChange={(e) => setReelUrl(e.target.value)} type='text' className='block' placeholder='place any instagram reel url here'/>
            <button type='submit' className='block'>Submit</button>
        </form>


        {downloadUrl ? <div>
            <div>Your video is ready for download</div>
            <video controls width='100%' src={downloadUrl} className='w-1/2'/>
            <a href={`https://proxy-server-rd.vercel.app/download?downloadUrl=${encodeURIComponent(downloadUrl)}`} download='instagram-reel.mp4' className='px-5 py-2 rounded-lg bg-black text-white'>Download Reel</a>
        </div> : <div>loading...</div>}

    </div>
  );
}
