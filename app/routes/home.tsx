import { Form, useFetcher, useSubmit } from "react-router";
import type { Route } from "./+types/home";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log("Form data:", formData);

  const file = formData.get("file");
  const filename = file instanceof File ? file.name : null;
  const triggeredBy = formData.get("submitBtn");

  return { filename, triggeredBy };
}

export default function Home({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  function submitForm(event: React.FormEvent<HTMLButtonElement>) {
    fetcher.submit(event.currentTarget.form);
  }

  return (
    <div className="space-y-4">
      <fetcher.Form method="POST" action="" encType="multipart/form-data">
        <div className="space-y-4">
          <div>
            <input
              type="file"
              name="file"
              className="border"
              placeholder="File"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500"
              name="submitBtn"
              value="native"
            >
              Native submit button
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={submitForm}
              className="bg-purple-500"
              name="submitBtn"
              value="This comes through as null either way 🤷"
            >
              fetcher.submit() Submit
            </button>
          </div>
        </div>
      </fetcher.Form>

      <pre>{JSON.stringify(actionData, null, 2)}</pre>
    </div>
  );
}
