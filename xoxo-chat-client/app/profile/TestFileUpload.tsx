'use client'

const TestFileUpload = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <form
        method="POST"
        action="http://localhost:3000/foo"
        encType="multipart/form-data"
        className="border-black w-2/5 border-[1px] rounded-md p-8 flex flex-col gap-4"
      >
        <div>
          <label className="block" htmlFor="firstName">
            Enter First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Jimmy"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
        </div>

        <div>
          <label className="block" htmlFor="lastName">
            Enter Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Smith"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
        </div>

        <div>
          <label className="block" htmlFor="file">
            Choose an image
          </label>
          <input
            id="file"
            name="file"
            type="file"
            multiple
            placeholder="Select Image"
            className="border-black border-[1px] w-full rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white rounded-md w-full py-2 my-6"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default TestFileUpload
