"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Define the form schema with zod
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  author: z.string().min(2, { message: "Author must be at least 2 characters." }),
  voice: z.string().min(1, { message: "Please select an assistant voice." }),
  pdfFile: z.any().refine((file) => file, "PDF file is required"),
  coverImage: z.any().optional(),
})

export default function UploadForm() {
  const [isSynthesizing, setIsSynthesizing] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: "",
      pdfFile: null,
      coverImage: null,
    },
  })

  // Simulated submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSynthesizing(true)
    console.log("Form values:", values)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsSynthesizing(false)
    form.reset()
    alert('Book successfully synthesized!')
  }

  return (
    <div className="new-book-wrapper relative">
      
      {/* Loading Overlay */}
      {isSynthesizing && (
        <div className="loading-wrapper rounded-2xl absolute inset-0 z-50 flex items-center justify-center bg-[#fff6e5]/80 backdrop-blur-sm">
           <div className="loading-shadow loading-shadow-wrapper bg-white">
              <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
              <h3 className="loading-title text-[#663820]">Synthesizing Book...</h3>
              <div className="loading-progress">
                <div className="loading-progress-item text-[#3d485e]">
                 <span className="loading-progress-status"></span> Processing PDF text...
                </div>
              </div>
           </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-transparent">
          
          {/* PDF Upload Dropzone */}
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <div 
                   className={`upload-dropzone border-2 border-dashed border-[rgba(33,42,59,0.2)] ${field.value ? 'upload-dropzone-uploaded' : ''}`}
                >
                  {field.value ? (
                     <div className="flex flex-col items-center gap-2">
                        <span className="upload-dropzone-text">{field.value.name}</span>
                        <button 
                           type="button" 
                           onClick={() => field.onChange(null)}
                           className="upload-dropzone-remove"
                           title="Remove PDF"
                        >
                           <X className="w-5 h-5" />
                        </button>
                     </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full relative p-6">
                        <input 
                           type="file" 
                           accept=".pdf" 
                           onChange={(e) => field.onChange(e.target.files?.[0])}
                           className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                         />
                        <Upload className="upload-dropzone-icon" />
                        <p className="upload-dropzone-text">Click to upload PDF</p>
                        <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image Upload Dropzone */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Cover Image (Optional)</FormLabel>
                <div 
                   className={`upload-dropzone border-2 border-dashed border-[rgba(33,42,59,0.2)] ${field.value ? 'upload-dropzone-uploaded' : ''}`}
                >
                  {field.value ? (
                     <div className="flex flex-col items-center gap-2">
                        <span className="upload-dropzone-text">{field.value.name}</span>
                        <button 
                           type="button" 
                           onClick={() => field.onChange(null)}
                           className="upload-dropzone-remove"
                           title="Remove Image"
                        >
                           <X className="w-5 h-5" />
                        </button>
                     </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full relative p-6">
                        <input 
                           type="file" 
                           accept="image/*" 
                           onChange={(e) => field.onChange(e.target.files?.[0])}
                           className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                         />
                        <ImageIcon className="upload-dropzone-icon" />
                        <p className="upload-dropzone-text">Click to upload cover image</p>
                        <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Rich Dad Poor Dad" className="form-input shadow-soft-sm focus-visible:ring-[#663820]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Input */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Robert Kiyosaki" className="form-input shadow-soft-sm focus-visible:ring-[#663820]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Selector */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-6"
                  >
                    {/* Male Voices Group */}
                    <div className="space-y-3">
                         <h4 className="text-sm font-medium text-[var(--text-secondary)] ml-1">Male Voices</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                { id: 'dave', name: 'Dave', desc: 'Young male, British-Essex, casual & conversational' },
                                { id: 'daniel', name: 'Daniel', desc: 'Middle-aged male, British, authoritative but warm' },
                                { id: 'chris', name: 'Chris', desc: 'Male, casual & easy-going' }
                            ].map((voice) => (
                                <FormItem key={voice.id} className="relative">
                                    <FormControl>
                                      <RadioGroupItem value={voice.id} className="peer sr-only" />
                                    </FormControl>
                                    <FormLabel 
                                        className={`voice-selector-option block h-full ${field.value === voice.id ? 'voice-selector-option-selected' : 'voice-selector-option-default'} !p-4 !m-0 !items-start w-full text-left font-normal flex flex-col gap-1`}
                                    >
                                       <div className="flex items-center gap-2 mb-1 w-full relative">
                                          <div className={`w-4 h-4 rounded-full border border-[var(--text-primary)] flex items-center justify-center flex-shrink-0 ${field.value === voice.id ? '' : 'bg-transparent'}`}>
                                             {field.value === voice.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-primary)]" />}
                                          </div>
                                          <span className="font-semibold text-lg text-[var(--text-primary)]">{voice.name}</span>
                                       </div>
                                       <span className="text-xs text-[var(--text-secondary)] font-normal leading-relaxed">{voice.desc}</span>
                                    </FormLabel>
                                </FormItem>
                            ))}
                         </div>
                    </div>

                    {/* Female Voices Group */}
                    <div className="space-y-3">
                         <h4 className="text-sm font-medium text-[var(--text-secondary)] ml-1">Female Voices</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                { id: 'rachel', name: 'Rachel', desc: 'Young female, American, calm & clear' },
                                { id: 'sarah', name: 'Sarah', desc: 'Young female, American, soft & approachable' },
                            ].map((voice) => (
                                <FormItem key={voice.id} className="relative">
                                    <FormControl>
                                      <RadioGroupItem value={voice.id} className="peer sr-only" />
                                    </FormControl>
                                    <FormLabel 
                                        className={`voice-selector-option block h-full ${field.value === voice.id ? 'voice-selector-option-selected' : 'voice-selector-option-default'} !p-4 !m-0 !items-start w-full text-left font-normal flex flex-col gap-1`}
                                    >
                                       <div className="flex items-center gap-2 mb-1 w-full relative">
                                          <div className={`w-4 h-4 rounded-full border border-[var(--text-primary)] flex items-center justify-center flex-shrink-0 ${field.value === voice.id ? '' : 'bg-transparent'}`}>
                                             {field.value === voice.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-primary)]" />}
                                          </div>
                                          <span className="font-semibold text-lg text-[var(--text-primary)]">{voice.name}</span>
                                       </div>
                                       <span className="text-xs text-[var(--text-secondary)] font-normal leading-relaxed">{voice.desc}</span>
                                    </FormLabel>
                                </FormItem>
                            ))}
                         </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit" disabled={isSynthesizing} className="form-btn mt-8 flex items-center justify-center w-full shadow-soft-sm">
            {isSynthesizing ? (
               <span className="flex items-center gap-3"><Loader2 className="w-6 h-6 animate-spin"/> Processing...</span>
            ) : "Begin Synthesis"}
          </button>
        </form>
      </Form>
    </div>
  )
}