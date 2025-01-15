import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload, MdError } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import Select from "react-select";
import useTheme from "@/Hook/useTheme";
import ImageUpload from "@/Api/ImageUpload";
import ReactQuill from "react-quill";

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

const AddPet = () => {
    const [photoPreview, setPhotoPreview] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [longDescError, setLongDescError] = useState(false);
    const [longDesc, setLongDesc] = useState('');
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        document.title = "Add a Pet || Kutto";
    }, []);

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (petData) => {
            await axiosSecure.post("/add-pet", petData);
        },
        onSuccess: () => {
            toast.success("Data Added Successfully!!!");
            navigate("/dashboard");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to add pet data.");
        },
    });

    const onSubmit = async (data) => {
        const { petImage, petName, petAge, petLocation, shortDescription } = data;
        const photoFile = petImage[0];
        const { value, unit } = petAge;


        if (longDesc.trim() === "" || longDesc === "<p><br></p>") {
            setLongDescError(true);
            return;
        }
        setLongDescError(false);

        if (!value || !unit) {
            toast.error("Pet age and unit are required.");
            return;
        }

        try {
            const imgUrl = await ImageUpload(photoFile);

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
                petOwner: {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                },
            };

            await mutateAsync(petData);
            reset();
            setPhotoPreview("");
            setSelectedOption(null);
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

    return (
        <section className="w-11/12 mx-auto h-auto flex flex-col-reverse lg:flex-row my-0 dark:bg-dark-lite rounded-md bg-white">
            {/* Register Form */}
            <div className="shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 flex-1">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                    <h3 className="text-[3rem] font-[700] text-center">Add a Pet</h3>

                    <div className="flex gap-4">
                        {/* Pet Name */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Pet Name"
                                className="inputField"
                                {...register("petName", { required: "Pet name is required." })}
                            />
                            {errors.petName && (
                                <p className="flex text-red-500 gap-1 items-center">
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
                        {/* Pet Location */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Pet Location"
                                className="inputField"
                                {...register("petLocation", { required: "Pet location is required." })}
                            />
                            {errors.petLocation && (
                                <p className="flex text-red-500 gap-1 items-center">
                                    <MdError /> {errors.petLocation.message}
                                </p>
                            )}
                        </div>

                        {/* Pet Categories */}
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

                    {/* Short Description */}
                    <div>
                        <textarea
                            rows={2}
                            placeholder="Short Description"
                            className="inputField w-full"
                            {...register("shortDescription", { required: "Short description is required." })}
                        />
                        {errors.shortDescription && (
                            <p className="flex text-red-500 gap-1 items-center">
                                <MdError /> {errors.shortDescription.message}
                            </p>
                        )}
                    </div>

                    {/* Long Description */}
                    <div>
                        <ReactQuill
                            theme="snow"
                            value={longDesc}
                            onChange={setLongDesc}
                            className={longDescError ? "border border-red-500" : ""}
                        />
                        {longDescError && (
                            <p className="flex text-red-500 gap-1 items-center mt-1">
                                <MdError /> Long description is required.
                            </p>
                        )}
                    </div>

                    {/* Pet Photo */}
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
                                    required: "Photo is required.",
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
                            <p className="flex text-red-500 gap-1 items-center mt-1">
                                <MdError /> {errors.petImage.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button type="submit" className="inputButton">
                            {isPending ? "Adding..." : "Add Pet"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddPet;