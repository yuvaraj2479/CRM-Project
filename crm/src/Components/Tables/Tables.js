
import { FaFileAlt } from "react-icons/fa";


const ResponsiveTable = ({ columns, data, handleClick, handlefile }) => {

  return (
    <div className="overflow-x-auto mt-10 p-10">
      <div className='flex justify-end mb-2'>
        <button className='bg-sky-600 text-white px-4 pt-1 pb-2 rounded-md' onClick={() => handleClick()}>Add</button>
      </div>

      <div className="min-w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-r-2">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
              {handlefile ? (
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  Document
                </div>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item[column]}
                  </td>
                ))}
                {handlefile ? (
                  <td className=" w-[70px]  h-full flex justify-center items-center mt-3">
                    <div className='flex items-center justify-center'>
                    <FaFileAlt onClick={() => handlefile(item)}
                          className={'text-alert-color-text  size-6 duration-300 text-[#c41105] hover:text-[#c41105]'}
                        />
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
        {
          data.length < 1 ?
            <div className='flex justify-center items-center mt-2 pt-2 pb-2 bg-red-500 text-white'>
              No Records Found
            </div> : <></>
        }
      </div>
    </div>
  );
};

export default ResponsiveTable;
