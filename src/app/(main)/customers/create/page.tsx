
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppHeader } from "@/components/layout/AppHeader"; // Keep AppHeader for layout consistency
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, CUSTOMER_TYPES, BUSINESS_SECTORS, CUSTOMER_ORIGINS } from "@/lib/constants";
import { ArrowLeft, User, Building, Mail, Phone, Globe, PlusCircle, Wand2, XIcon, Edit3 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const addClientFormSchema = z.object({
  avatarUrl: z.string().optional(),
  clientNamePlaceholder: z.string().optional(), // For display only in header
  clientSubtitlePlaceholder: z.string().optional(), // For display only in header

  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  
  // Fields for "+ Add Business details" - initially hidden or on another step
  // For now, let's include them in the schema but manage their visibility.
  customerType: z.enum(["Empresa", "Particular", "Freelancer"]).optional(),
  taxId: z.string().optional(),
  addressStreet: z.string().optional(),
  addressCity: z.string().optional(),
  addressState: z.string().optional(),
  addressPostalCode: z.string().optional(),
  website: z.string().url().or(z.literal('')).optional(),
  businessSector: z.enum(["Tecnología", "Diseño", "Retail", "Salud", "Consultoría", "Educación", "Finanzas", "Manufactura", "Otro"]).optional(),
  customerOrigin: z.enum(["Referido", "Google", "Redes Sociales", "Publicidad Online", "Evento", "Otro"]).optional(),
  internalNotes: z.string().optional(),
});

type AddClientFormValues = z.infer<typeof addClientFormSchema>;

const defaultValues: Partial<AddClientFormValues> = {
  clientNamePlaceholder: "Alex Johnson", // Placeholder from image
  clientSubtitlePlaceholder: "Over 8 years in tech, specializing in product management and user experience.", // Placeholder
  firstName: "",
  lastName: "",
  email: "",
  country: "United States", // Default from image
};

export default function CreateCustomerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showBusinessDetails, setShowBusinessDetails] = React.useState(false);

  const form = useForm<AddClientFormValues>({
    resolver: zodResolver(addClientFormSchema),
    defaultValues,
  });

  const onSubmit = (data: AddClientFormValues) => {
    console.log("New client data:", data);
    // In a real app, you would send this data to your backend to create the customer.
    // For now, let's simulate success and navigate back.
    toast({
      title: "Client Created",
      description: `${data.firstName} ${data.lastName} has been successfully added.`,
    });
    router.push("/customers"); // Navigate to customer list after creation
  };
  
  const watchedFirstName = form.watch("firstName");
  const watchedLastName = form.watch("lastName");
  const clientDisplayName = `${watchedFirstName || ""} ${watchedLastName || ""}`.trim() || defaultValues.clientNamePlaceholder;


  return (
    <>
      {/* AppHeader can be part of the main layout, page specific title set here */}
      {/* For a modal look directly on the page, we might not need a separate AppHeader component for this specific page if it's meant to be full screen modal-like */}
      <div className="flex flex-col min-h-screen bg-muted/40 items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <Card className="shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="bg-card p-6 border-b">
              <div className="flex items-center justify-between mb-6">
                <CardTitle className="text-lg font-semibold text-foreground">ADD CLIENT</CardTitle>
                <Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
                  <Link href="/customers"><XIcon className="h-5 w-5" /></Link>
                </Button>
              </div>

              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-3 border-2 border-primary/20">
                  <AvatarImage src={form.watch("avatarUrl") || `https://placehold.co/150x150.png?text=${(watchedFirstName?.[0] || 'A')}${(watchedLastName?.[0] || 'J')}`} data-ai-hint="user avatar gradient" />
                  <AvatarFallback className="text-3xl">{`${(watchedFirstName?.[0] || 'A')}${(watchedLastName?.[0] || 'J')}`}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" className="text-primary font-medium text-xs mb-2">
                  <Wand2 className="h-3.5 w-3.5 mr-1.5"/>
                  Get help using AI to auto-fill client data from database
                </Button>
                <h2 className="text-2xl font-bold text-foreground">{clientDisplayName}</h2>
                <p className="text-sm text-muted-foreground font-light max-w-md">
                  {defaultValues.clientSubtitlePlaceholder}
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>FIRST NAME</FormLabel>
                          <FormControl>
                            <Input placeholder="Alex" {...field} className="font-light bg-card border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary pl-0.5"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>LAST NAME</FormLabel>
                          <FormControl>
                            <Input placeholder="Johnson" {...field} className="font-light bg-card border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary pl-0.5"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Building className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>COMPANY NAME</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Innovations Inc" {...field} className="font-light bg-card border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary pl-0.5"/>
                        </FormControl>
                        <FormMessage className="font-light text-xs"/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>EMAIL ADDRESS</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="alex.johnson@techinnovations.com" {...field} className="font-light bg-card border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary pl-0.5"/>
                        </FormControl>
                        <FormMessage className="font-light text-xs"/>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>PHONE NUMBER</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 987-6543" {...field} className="font-light bg-card border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary pl-0.5"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Globe className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>COUNTRY</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="font-light bg-card border-0 border-b rounded-none focus:ring-0 focus:ring-offset-0 focus:border-primary pl-0.5">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-light">
                              {COUNTRIES.map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                  </div>

                  {!showBusinessDetails && (
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-primary p-0 h-auto font-medium mt-4 flex items-center"
                      onClick={() => setShowBusinessDetails(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1.5"/> Add Business details
                    </Button>
                  )}

                  {showBusinessDetails && (
                    <div className="space-y-6 pt-4 border-t mt-6">
                       <h3 className="text-md font-semibold text-foreground mb-3">Business Details</h3>
                       <FormField
                        control={form.control}
                        name="customerType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground">CUSTOMER TYPE</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger className="font-light bg-card"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                              <SelectContent className="font-light">
                                {CUSTOMER_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="taxId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground">TAX ID / NIF</FormLabel>
                            <FormControl><Input placeholder="e.g., B12345678" {...field} className="font-light bg-card"/></FormControl>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="addressStreet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground">STREET ADDRESS</FormLabel>
                            <FormControl><Input placeholder="Calle Falsa 123" {...field} className="font-light bg-card"/></FormControl>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="addressCity" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">CITY</FormLabel><FormControl><Input placeholder="Madrid" {...field} className="font-light bg-card"/></FormControl><FormMessage className="font-light text-xs"/></FormItem>)} />
                        <FormField control={form.control} name="addressState" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">STATE/PROVINCE</FormLabel><FormControl><Input placeholder="Madrid" {...field} className="font-light bg-card"/></FormControl><FormMessage className="font-light text-xs"/></FormItem>)} />
                        <FormField control={form.control} name="addressPostalCode" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">POSTAL CODE</FormLabel><FormControl><Input placeholder="28001" {...field} className="font-light bg-card"/></FormControl><FormMessage className="font-light text-xs"/></FormItem>)} />
                      </div>
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground">WEBSITE</FormLabel>
                            <FormControl><Input placeholder="https://example.com" {...field} className="font-light bg-card"/></FormControl>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="businessSector" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">BUSINESS SECTOR</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="font-light bg-card"><SelectValue placeholder="Select sector" /></SelectTrigger></FormControl><SelectContent className="font-light">{BUSINESS_SECTORS.map(sector => <SelectItem key={sector} value={sector}>{sector}</SelectItem>)}</SelectContent></Select><FormMessage className="font-light text-xs"/></FormItem>)} />
                        <FormField control={form.control} name="customerOrigin" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">CUSTOMER ORIGIN</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="font-light bg-card"><SelectValue placeholder="Select origin" /></SelectTrigger></FormControl><SelectContent className="font-light">{CUSTOMER_ORIGINS.map(origin => <SelectItem key={origin} value={origin}>{origin}</SelectItem>)}</SelectContent></Select><FormMessage className="font-light text-xs"/></FormItem>)} />
                      </div>
                      <FormField
                        control={form.control}
                        name="internalNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground">INTERNAL NOTES</FormLabel>
                            <FormControl><Textarea placeholder="Private notes about the client..." {...field} className="font-light bg-card" rows={3}/></FormControl>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="button" 
                        variant="link" 
                        className="text-muted-foreground p-0 h-auto font-medium mt-2 text-sm"
                        onClick={() => setShowBusinessDetails(false)}
                      >
                        Hide Business details
                      </Button>
                    </div>
                  )}
                  
                  {/* Placeholder for AI Section - to be implemented later */}
                  {/* 
                  <div className="pt-4 border-t mt-6">
                    <h3 className="text-md font-semibold text-foreground mb-3">AI Analysis</h3>
                    <Button type="button" variant="outline" className="w-full mb-2">
                      <Wand2 className="mr-2 h-4 w-4"/> Analizar Perfil con IA
                    </Button>
                    <Textarea placeholder="AI generated description and opportunities..." rows={4} readOnly className="bg-muted/50 font-light"/>
                  </div> 
                  */}

                </form>
              </Form>
            </CardContent>
            <CardFooter className="bg-secondary/50 p-6 flex justify-end gap-3 border-t">
              <Button variant="outline" onClick={() => router.push("/customers")} className="font-medium">Cancel</Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

    