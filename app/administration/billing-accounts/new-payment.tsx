import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { addPayment } from "../../../store/billingSlice";
import { AppDispatch } from "../../../store/store";

type PaymentFormData = {
  owner: string;
  date: string;
  concept: string;
  amount: string;
  paymentMethod: string;
  comments: string;
};

const PAYMENT_METHODS = [
  "Check",
  "Cash",
  "Wire transfer",
  "Credit card",
  "Other",
];

export default function NewPaymentModal() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isMethodPickerVisible, setMethodPickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PaymentFormData>({
    defaultValues: {
      owner: "",
      date: "",
      concept: "Account Payment",
      amount: "",
      paymentMethod: "",
      comments: "",
    },
  });

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleDateConfirm = (date: Date) => {
    setValue("date", format(date, "MMM dd, yyyy"));
    hideDatePicker();
  };

  const showMethodPicker = () => setMethodPickerVisible(true);
  const hideMethodPicker = () => setMethodPickerVisible(false);

  const onSubmit = async (data: PaymentFormData) => {
    try {
      console.log("Iniciando submit...");
      console.log("Payment Data:", data);

      const dateParts = data.date.split(" ");
      const month = dateParts[0];
      const day = dateParts[1].replace(",", "");
      const year = dateParts[2];
      const isoDate = `${year}-${getMonthNumber(month)}-${day.padStart(
        2,
        "0"
      )}`;

      const newMovement = {
        total_amount_owner: parseFloat(data.amount),
        due_date: isoDate,
        bill_to: {
          id: 1,
          name: data.owner,
        },
        paid: parseFloat(data.amount),
        date: isoDate,
        number: 0,
        current_payment_status: "paid",
        balance: 0,
      };

      dispatch(addPayment(newMovement));

      reset();
      router.push("/administration/billing-accounts");
    } catch (error) {
      console.error("Error en submit:", error);
    }
  };

  const getMonthNumber = (month: string) => {
    const months: { [key: string]: string } = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return months[month] || "01";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Payment</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.sectionTitle}>ACCOUNT INFORMATION</Text>
        <Text style={styles.label}>Owner</Text>
        <Controller
          control={control}
          name="owner"
          rules={{ required: "Owner is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.owner && styles.inputError]}
              placeholder="Select"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.owner && (
          <Text style={styles.errorText}>{errors.owner.message}</Text>
        )}

        <Text style={styles.sectionTitle}>PAYMENT INFORMATION</Text>
        <Text style={styles.label}>Date</Text>
        <Controller
          control={control}
          name="date"
          rules={{ required: "Date is required" }}
          render={({ field: { value } }) => (
            <TouchableOpacity
              style={[styles.input, errors.date && styles.inputError]}
              onPress={showDatePicker}
            >
              <Text style={value ? styles.inputText : styles.placeholderText}>
                {value || "Select date"}
              </Text>
            </TouchableOpacity>
          )}
        />
        {errors.date && (
          <Text style={styles.errorText}>{errors.date.message}</Text>
        )}

        <Text style={styles.label}>Concept</Text>
        <Controller
          control={control}
          name="concept"
          render={({ field: { value } }) => (
            <TextInput style={styles.input} value={value} editable={false} />
          )}
        />

        <Text style={styles.label}>Amount Paid</Text>
        <Controller
          control={control}
          name="amount"
          rules={{
            required: "Amount is required",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Please enter a valid amount",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.amount && styles.inputError]}
              keyboardType="numeric"
              onChangeText={onChange}
              value={value}
              placeholder="0.00"
            />
          )}
        />
        {errors.amount && (
          <Text style={styles.errorText}>{errors.amount.message}</Text>
        )}

        <Text style={styles.label}>Payment Method</Text>
        <Controller
          control={control}
          name="paymentMethod"
          rules={{ required: "Payment method is required" }}
          render={({ field: { value } }) => (
            <TouchableOpacity
              style={[styles.input, errors.paymentMethod && styles.inputError]}
              onPress={showMethodPicker}
            >
              <Text style={value ? styles.inputText : styles.placeholderText}>
                {value || "Select payment method"}
              </Text>
            </TouchableOpacity>
          )}
        />
        {errors.paymentMethod && (
          <Text style={styles.errorText}>{errors.paymentMethod.message}</Text>
        )}

        <Text style={styles.label}>Comments</Text>
        <Controller
          control={control}
          name="comments"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              placeholder="Add comment"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            console.log("Botón presionado");
            console.log("Errores:", errors);
            handleSubmit(onSubmit)();
          }}
        >
          <Text style={styles.submitButtonText}>Submit Payment</Text>
        </TouchableOpacity>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Modal
        visible={isMethodPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={hideMethodPicker}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Payment Method</Text>
              <TouchableOpacity onPress={hideMethodPicker}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method}
                style={styles.methodOption}
                onPress={() => {
                  setValue("paymentMethod", method);
                  hideMethodPicker();
                }}
              >
                <Text style={styles.methodOptionText}>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  formContainer: {
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 20,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  inputText: {
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#2ecc40",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  methodOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  methodOptionText: {
    fontSize: 16,
    color: "#333",
  },
});
