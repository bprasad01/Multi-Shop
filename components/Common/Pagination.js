import React from "react"
import styles from '../../styles/Pagination.module.css'

const Pagination = ({ pageCount, pageIndex, setPageIndex }) => {
  let pagination = []
  let pageCountSet = []
  for (let i = 1; i <= pageCount; i++) {
    pageCountSet.push(i)
  }

  let finalIndexes = []
  switch (pageCount > 5) {
    case true:
      switch (parseInt(pageIndex)) {
        case 1:
          //if on first page, show from 1-4 and then last page number
          if (parseInt(pageIndex) === 1) {
            finalIndexes = pageCountSet.slice(
              parseInt(pageIndex) - 1,
              parseInt(pageIndex) + 2
            )
            finalIndexes.push(pageCount)
            finalIndexes.splice(finalIndexes.length - 1, 0, "...")
          }

          break

        //if on last page, show first page and last 4 page numbers
        case pageCountSet[pageCountSet.length - 1]:
          if (parseInt(pageIndex) === pageCountSet[pageCountSet.length - 1]) {
            finalIndexes = pageCountSet.slice(
              parseInt(pageIndex) - 3,
              parseInt(pageIndex)
            )
            finalIndexes.unshift(1)
            finalIndexes.splice(1, 0, "...")
          }
          break

        //if on second page, show from 2-5 and last page number
        case pageCountSet[1]:
          if (parseInt(pageIndex) === pageCountSet[1]) {
            finalIndexes = pageCountSet.slice(0, parseInt(pageIndex) + 2)
            finalIndexes.push(pageCount)
            finalIndexes.splice(finalIndexes.length - 1, 0, "...")
          }
          break
        //if on third page, show from 3-5 and last page number
        case pageCountSet[2]:
          if (parseInt(pageIndex) === pageCountSet[2]) {
            finalIndexes = pageCountSet.slice(0, parseInt(pageIndex) + 1)
            finalIndexes.push(pageCount)
            finalIndexes.splice(finalIndexes.length - 1, 0, "...")
          }
          break

        //if on last but one page, show last 5 page numbers
        case pageCountSet[pageCountSet.length - 2]:
          if (parseInt(pageIndex) === pageCountSet[pageCountSet.length - 2]) {
            finalIndexes = pageCountSet.slice(
              parseInt(pageIndex) - 3,
              parseInt(pageIndex) + 1
            )
            finalIndexes.unshift(1)
            finalIndexes.splice(1, 0, "...")
          }
          break

        //if on last but two page, show last 5 page numbers
        case pageCountSet[pageCountSet.length - 3]:
          if (parseInt(pageIndex) === pageCountSet[pageCountSet.length - 3]) {
            finalIndexes = pageCountSet.slice(
              parseInt(pageIndex) - 3,
              parseInt(pageIndex) + 2
            )
            finalIndexes.unshift(1)
            finalIndexes.splice(1, 0, "...")
          }
          break

        default:
          //if numbers in between, show one on each side as well as first and last page numbers
          finalIndexes = pageCountSet.slice(
            parseInt(pageIndex) - 2,
            parseInt(pageIndex) + 1
          )
          finalIndexes.unshift(1)
          finalIndexes.push(pageCount)
          finalIndexes.splice(finalIndexes.length - 1, 0, "...")
          finalIndexes.splice(1, 0, "...")
          break
      }
      break

    default:
      for (let i = 1; i <= pageCount; i++) {
        pagination.push(
          <>
            <li
              key={i}
              className={`${styles.pageItem}${
                parseInt(pageIndex) === i ? " active" : ""
              }`}
              aria-current="page"
            >
              <a onClick={() => setPageIndex(i)}>
                <span className="page-link">{i}</span>
              </a>
            </li>
          </>
        )
      }
      break
  }
  finalIndexes.map(index => {
    pagination.push(
      <>
        {index !== "..." && (
          <>
            <li
              key={index}
              className={`${styles.pageItem}${
                parseInt(pageIndex) + 1 === index ? " mobile_active " : ""
              } ${
                parseInt(pageIndex) === finalIndexes[4]
                  ? parseInt(pageIndex) - 2 === index
                    ? " mobile_active "
                    : ""
                  : ""
              } ${
                parseInt(pageIndex) - 1 === 0
                  ? parseInt(pageIndex) + 2 === index
                    ? " mobile_active "
                    : ""
                  : ""
              } ${parseInt(pageIndex) - 1 === index ? " mobile_active " : ""} ${
                parseInt(pageIndex) === index ? " active mobile_active " : ""
              }`}
              aria-current="page"
            >
              <li
              key={index}
              className={`${styles.pageItem}${
                parseInt(pageIndex) + 1 === index ? " mobile_active " : ""
              } ${
                parseInt(pageIndex) === finalIndexes[4]
                  ? parseInt(pageIndex) - 2 === index
                    ? " mobile_active "
                    : ""
                  : ""
              } ${
                parseInt(pageIndex) - 1 === 0
                  ? parseInt(pageIndex) + 2 === index
                    ? " mobile_active "
                    : ""
                  : ""
              } ${parseInt(pageIndex) - 1 === index ? " mobile_active " : ""} ${
                parseInt(pageIndex) === index ? " active mobile_active " : ""
              }`}
              aria-current="page"
                onClick={() => setPageIndex(index)} 
            >
              <span style={{cursor : 'pointer'}}>{index}</span>
            </li> 
            </li>
          </>
        )}
        {index === "..." && (
          <>
            <li className={styles.pageItemDots}>
              <span>...</span>
            </li>
          </>
        )}
      </>
    )
  })

  return <ul className="pagination">{pagination}</ul>
}

export default Pagination