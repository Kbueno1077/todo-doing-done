import MultipleColumnsExample from "@/components/MultipleColumnsExample/MultipleColumnsExample";

export default async function Index() {
    return (
        <div className="flex-1 w-full flex flex-col">
            <main className="flex-1 flex flex-col gap-6 px-6 py-6">
                <MultipleColumnsExample />
            </main>
        </div>
    );
}
