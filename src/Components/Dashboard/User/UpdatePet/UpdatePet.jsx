import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload, MdError } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import Select from "react-select";
import useTheme from "@/Hook/useTheme";
import ImageUpload from "@/Api/ImageUpload";
import ReactQuill from "react-quill";
import useRole from "@/Hook/useRole";

const options = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "fish", label: "Fish" },
    { value: "parrot", label: "Parrot" },
    { value: "turtle", label: "Turtle" },
    { value: "birds", label: "Birds" },
    { value: "gold fish", label: "Gold Fish" },
    { value: "mouse", label: "Mouse" },
    { value: "goat", label: "Goat" },
    { value: "ferret", label: "Ferret" },
];

const UpdatePet = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { id } = useParams();
    const queryClient = useQueryClient()
    const [selectedOption, setSelectedOption] = useState(null);
    const [longDesc, setLongDesc] = useState("");
    const [photoPreview, setPhotoPreview] = useState("");
    const [role] = useRole()

    useEffect(() => {
        document.title = "Update Pet || Kutto";
    }, []);

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (petData) => {
            await axiosSecure.put(`/update-pets/${id}`, petData);
        },
        onSuccess: () => {
            toast.success("Data Updated Successfully!!!");
            queryClient.invalidateQueries(["myPets"]);
            navigate(role === 'admin' ? '/dashboard/all-pets' : '/dashboard/my-add-pets');
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update pet data.");
        },
    });

    const { data: pet = {}, isLoading } = useQuery({
        queryKey: ["pet", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/pets/${id}`);
            return data;
        },
    });

    useEffect(() => {
        if (!isLoading && pet) {
            setSelectedOption({
                value: pet.petCategories,
                label: pet.petCategories
                    ? pet.petCategories.charAt(0).toUpperCase() + pet.petCategories.slice(1)
                    : "",
            });
            setLongDesc(pet.longDescription || "");
            setPhotoPreview(pet.petImage || "");
        }
    }, [pet, isLoading]);

    const onSubmit = async (data) => {
        const { petImage, petName, petAge, petLocation, shortDescription } = data;
        const photoFile = petImage?.[0];

        const { value, unit } = petAge;

        if (!value || !unit) {
            toast.error("Pet age and unit are required.");
            return;
        }

        try {
            let imgUrl = pet?.petImage;
            if (photoFile) {
                imgUrl = await ImageUpload(photoFile);
            }

            const petData = {
                petImage: imgUrl,
                petName,
                petAge: {
                    value: parseInt(value),
                    unit: unit,
                },
                petLocation,
                shortDescription,
                longDescription: longDesc,
                petCategories: selectedOption?.value,
                adopted: false,
                petOwner: pet?.petOwner
            };

            await mutateAsync(petData);
        } catch (error) {
            toast.error(error.message || "Image upload failed.");
        }
    };

    const getCustomStyles = (theme) => ({
        control: (base) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#09101a" : "#f8f9fa",
            borderRadius: "0.5rem",
            borderColor: theme === "dark" ? "#fff" : "#ced4da",
            padding: "0.4rem",
            boxShadow: "none",
            "&:hover": {
                borderColor: theme === "dark" ? "#1d2a39" : "#007bff",
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? theme === "dark" ? "#1d2a39" : "#007bff"
                : state.isFocused
                    ? theme === "dark" ? "#2a3948" : "#e9ecef"
                    : theme === "dark" ? "#1b1f26" : "#fff",
            color: state.isSelected
                ? "#fff"
                : theme === "dark" ? "#e0e0e0" : "#495057",
            cursor: "pointer",
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "0.5rem",
            backgroundColor: theme === "dark" ? "#1b1f26" : "#fff",
            overflow: "hidden",
            zIndex: 100,
        }),
        placeholder: (base) => ({
            ...base,
            color: theme === "dark" ? "#b0b3b8" : "#6c757d",
        }),
        singleValue: (base) => ({
            ...base,
            color: theme === "dark" ? "#e0e0e0" : "#495057",
        }),
    });

    if (isLoading) return <p>Loading...</p>

    return (
        <section className="w-11/12 mx-auto my-4">
            <div className="rounded-lg bg-white dark:bg-dark-lite p-6 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <h3 className="text-3xl font-bold text-center">Update Pet</h3>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue={pet?.petName}
                                placeholder="Pet Name"
                                {...register("petName", { required: "Pet name is required." })}
                                className="inputField"
                            />
                            {errors.petName && (
                                <p className="text-red-500 flex items-center gap-2">
                                    <MdError /> {errors.petName.message}
                                </p>
                            )}
                        </div>

                        {/* Pet Age */}
                        <div className="flex gap-4 flex-1">
                            {/* Numeric Input for Age */}
                            <div className="flex-1">
                                <input
                                    type="number"
                                    placeholder="Pet Age"
                                    className="inputField"
                                    defaultValue={pet?.petAge?.value}
                                    {...register("petAge.value", { required: "Pet age is required." })}
                                />
                                {errors.petAge?.value && (
                                    <p className="flex text-red-500 gap-1 items-center">
                                        <MdError /> {errors.petAge.value.message}
                                    </p>
                                )}
                            </div>

                            {/* Dropdown for Months/Years */}
                            <div>
                                <select
                                    className="inputField"
                                    defaultValue={pet?.petAge?.unit}
                                    {...register("petAge.unit", { required: "Pet age unit is required." })}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                                {errors.petAge?.unit && (
                                    <p className="flex text-red-500 gap-1 items-center">
                                        <MdError /> {errors.petAge.unit.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue={pet?.petLocation}
                                placeholder="Pet Location"
                                {...register("petLocation", { required: "Pet location is required." })}
                                className="inputField"
                            />
                            {errors.petLocation && (
                                <p className="text-red-500 flex items-center gap-2">
                                    <MdError /> {errors.petLocation.message}
                                </p>
                            )}
                        </div>

                        <div className="flex-1">
                            <Controller
                                name="petCategories"
                                control={control}
                                rules={{ required: "Pet category is required." }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={options}
                                        placeholder="Select Pet Category"
                                        isClearable
                                        styles={getCustomStyles(theme)}
                                        value={selectedOption}
                                        onChange={(selected) => {
                                            setSelectedOption(selected);
                                            field.onChange(selected?.value);
                                        }}
                                    />
                                )}
                            />
                            {errors.petCategories && (
                                <p className="flex text-red-500 gap-1 items-center">
                                    <MdError /> {errors.petCategories.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <textarea
                            rows={2}
                            placeholder="Short Description"
                            {...register("shortDescription", { required: "Short description is required." })}
                            className="inputField w-full"
                            defaultValue={pet?.shortDescription}
                        />
                        {errors.shortDescription && (
                            <p className="text-red-500 flex items-center gap-2">
                                <MdError /> {errors.shortDescription.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <ReactQuill
                            theme="snow"
                            value={longDesc}
                            onChange={setLongDesc}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="petImage"
                            className="flex items-center justify-center w-full h-16 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-color-accent transition-all"
                        >
                            <span className="text-gray-500 flex items-center gap-2">
                                <MdCloudUpload className="text-xl" /> Upload Photo
                            </span>
                            {photoPreview && (
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-14 h-14 object-cover rounded-md border border-gray-300 ml-4"
                                />
                            )}
                            <input
                                id="petImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...register("petImage", {
                                    onChange: (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setPhotoPreview(URL.createObjectURL(file));
                                        }
                                    },
                                })}
                            />
                        </label>
                        {errors.petImage && (
                            <p className="text-red-500 flex items-center gap-2">
                                <MdError /> {errors.petImage.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button type="submit" className="inputButton">
                            {isPending ? "Updating..." : "Update Pet"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdatePet;
