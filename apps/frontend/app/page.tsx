import styles from './page.module.scss';

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
  console.log('hello',data);
  
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there,</span>
              Welcome frontend 👋
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
