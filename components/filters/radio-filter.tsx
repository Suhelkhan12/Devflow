import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioFilter = () => {
  return (
    <RadioGroup className="background-light800_dark300 2 flex w-xs gap-0 overflow-hidden rounded-lg">
      {/* Questions */}
      <FieldLabel htmlFor="questions" className="w-1/2 cursor-pointer">
        <div className="relative w-full">
          <RadioGroupItem value="questions" id="questions" className="peer absolute top-2 right-2 z-10 opacity-0" />

          <Field
            orientation="horizontal"
            className="peer-data-[state=checked]:bg-primary-fade dark:peer-data-[state=checked]:bg-dark-400 w-full px-4 py-3 transition-all duration-200"
          >
            <FieldContent className="flex items-center justify-center">
              <FieldTitle className="text-light-500">Questions</FieldTitle>
            </FieldContent>
          </Field>
        </div>
      </FieldLabel>

      {/* Answers */}
      <FieldLabel htmlFor="answers" className="w-1/2 cursor-pointer">
        <div className="relative w-full">
          <RadioGroupItem value="answers" id="answers" className="peer absolute top-2 right-2 z-10 opacity-0" />

          <Field
            orientation="horizontal"
            className="peer-data-[state=checked]:bg-primary-fade dark:peer-data-[state=checked]:bg-dark-400 w-full px-4 py-3 text-center transition-all duration-200"
          >
            <FieldContent className="flex items-center justify-center">
              <FieldTitle className="text-light-500">Answers</FieldTitle>
            </FieldContent>
          </Field>
        </div>
      </FieldLabel>
    </RadioGroup>
  );
};

export default RadioFilter;
