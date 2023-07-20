import './page.module.scss';

async function getData() {
  const res = await fetch('http://localhost:3000/api')
   if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  const data = await getData()
  
  return (
    <div  className="bg-gray-50">
      <div>
        <div >            
            {/* <Label data={data}/> */}
        </div>
      </div>
    </div>
  );
}
