// 'use client'
// import api from '@/lib/api'
// import React, { useEffect, useState } from 'react'

// // Define the type for your API response data
// type Activity = {
//   id: string
//   type: string
//   icon: string | null
//   title: string | null
//   content: string | null
//   link: string
//   image: string
//   uploaded_at: string
// }

// function Page () {
//   // Explicitly define state type as an array of Activity objects
//   const [data, setData] = useState<Activity[]>([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get<Activity[]>(
//           '/api/activities.php?activity=4'
//         )
//         console.log('Response:', response)

//         // Ensure the response is an array before setting state
//         setData(Array.isArray(response.data) ? response.data : [response.data])
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <div>
//       <h1>Activities</h1>
//       {data.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {data.map((item, index) => (
//             <li key={index}>
//               <p>
//                 <strong>ID:</strong> {item.id}
//               </p>
//               <p>
//                 <strong>Type:</strong> {item.type}
//               </p>
//               {item.title && (
//                 <p>
//                   <strong>Title:</strong> {item.title}
//                 </p>
//               )}
//               {item.content && (
//                 <p>
//                   <strong>Content:</strong> {item.content}
//                 </p>
//               )}
//               {item.link && (
//                 <p>
//                   <strong>Link:</strong>{' '}
//                   <a href={item.link} target='_blank' rel='noopener noreferrer'>
//                     {item.link}
//                   </a>
//                 </p>
//               )}

//               {item.image && (
//                 <p>
//                   <strong>Image:</strong> <br />
//                   <img
//                     src={'https://alhudaic.ca/api/' + item.image}
//                     alt='Activity'
//                     width='200'
//                   />
//                   ;
//                   <img
//                     src={'https://alhudaic.ca/api/' + item.image}
//                     alt='Activity'
//                     width='200'
//                   />
//                 </p>
//               )}
//               <p>
//                 <strong>Uploaded At:</strong> {item.uploaded_at}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default Page
'use client'
import api from '@/lib/api'
import React, { useEffect, useState } from 'react'

// Define the type for your API response data
type Activity = {
  id: string
  type: string
  icon: string | null
  title: string | null
  content: string | null
  link: string
  image: string
  uploaded_at: string
}

function Page () {
  const [data, setData] = useState<Activity[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Activity[]>(
          '/api/activities.php?activity=2'
        )
        console.log('Response:', response)

        setData(Array.isArray(response.data) ? response.data : [response.data])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Activities</h1>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Icon</th>
              <th>Content</th>
              <th>Link</th>
              <th>Image</th>
              <th>Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {data.map(activity => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.title || 'N/A'}</td>
                <td>{activity.type}</td>
                <td>{activity.icon || 'N/A'}</td>
                <td>{activity.content || 'N/A'}</td>
                <td>
                  <a
                    href={activity.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {activity.link}
                  </a>
                </td>
                <td>
                  {activity.image && (
                    <img
                      src={'https://alhudaic.ca/api/' + activity.image}
                      alt='Activity'
                      width='50'
                      style={{ borderRadius: '4px' }}
                    />
                  )}
                </td>
                <td>{activity.uploaded_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Page
